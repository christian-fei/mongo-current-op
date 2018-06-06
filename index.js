#!/usr/bin/env node

const execa = require('execa')
const stringify = require('json-stringify-pretty-compact')

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
      acc.push(stringify(op.command.pipeline))
    }
    if (op.command.find) {
      acc.push(`find on "${op.command.find}"`, stringify(op.command.filter))
    }
  }

  if (op.msg) {
    acc.push(op.msg)
    acc.push(`  on ${op.command.createIndexes} - ${stringify(op.command.indexes)}`)
  }

  return acc
}

function main () {
  execa(`mongo`, ['--eval', '"JSON.stringify(db.currentOp())"', '--quiet'], {
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
