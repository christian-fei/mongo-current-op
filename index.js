#!/usr/bin/env node

const execa = require('execa')

if (require.main === module) {
  main()
} else {
  module.exports = {
    opToRows
  }
}

function opToRows (op) {
  const acc = []
  if (op.command) {
    if (op.command.u) {
      acc.push(`update on "${op.ns}"`)
      acc.push(op.command.u)
      // acc.push(JSON.stringify(op.command))
    }
    if (op.command.aggregate) {
      acc.push(`aggregate on "${op.command.aggregate}"`)
      acc.push(JSON.stringify(op.command.pipeline))
    }
    if (op.command.find) {
      acc.push(`find on "${op.command.find}"`, JSON.stringify(op.command.filter))
    }
  }

  if (op.msg) {
    acc.push(op.msg)
    acc.push(`  on ${op.command.createIndexes} - ${JSON.stringify(op.command.indexes)}`)
  }

  return acc
}

function main () {
  execa(`mongo`, [process.argv[2], '--eval', '"JSON.stringify(db.currentOp())"', '--quiet'], {
    shell: true
  }).then(result => {
    const jsonOutput = JSON.parse(result.stdout)
    const {inprog} = jsonOutput
    for (const op of inprog.slice(1)) {
      process.stdout.write('--------------------------\n')

      const rows = opToRows(op)
      rows.forEach(r => process.stdout.write(`${r}\n`))
    }
  })
  .catch(console.error)
}
