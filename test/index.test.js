/* globals test */

const assert = require('assert')
const { opToRows } = require('..')

test('opToRows: update', () => {
  const resultUpdate = opToRows({
    ns: 'collection',
    command: {
      u: 'MONGO_DESCRIPTION'
    }
  })

  assert.deepEqual(resultUpdate, [
    'update on "collection"',
    'MONGO_DESCRIPTION'
  ])
})

test('opToRows: aggregate', () => {
  const resultUpdate = opToRows({
    ns: 'database_name',
    command: {
      aggregate: 'collection',
      pipeline: []
    }
  })

  assert.deepEqual(resultUpdate, [
    'aggregate on "collection"',
    '[]'
  ])
})

test('opToRows: find', () => {
  const resultUpdate = opToRows({
    ns: 'database_name',
    command: {
      find: 'collection',
      filter: {}
    }
  })

  assert.deepEqual(resultUpdate, [
    'find on "collection"',
    '{}'
  ])
})

test('opToRows: indexes', () => {
  const resultUpdate = opToRows({
    msg: 'CreateIndexes',
    command: {
      createIndexes: 'collection',
      indexes: 'collection_key_1'
    }
  })

  assert.deepEqual(resultUpdate, [
    'CreateIndexes',
    '  on collection - "collection_key_1"'
  ])
})
