/* globals test */

const assert = require('assert')
const { opToString } = require('..')

test('opToString: update', () => {
  const resultUpdate = opToString({
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

test('opToString: aggregate', () => {
  const resultUpdate = opToString({
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

test('opToString: find', () => {
  const resultUpdate = opToString({
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

test('opToString: indexes', () => {
  const resultUpdate = opToString({
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
