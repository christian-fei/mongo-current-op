[![travis](https://img.shields.io/travis/christian-fei/mongo-current-op.svg?style=flat-square)](https://travis-ci.org/christian-fei/mongo-current-op) [![npm-version](https://img.shields.io/npm/v/mongo-current-op.svg?style=flat-square&colorB=007EC6)](https://www.npmjs.com/package/mongo-current-op) [![npm-dependencies](https://img.shields.io/badge/dependencies-none-blue.svg?style=flat-square&colorB=44CC11)](package.json) [![standard-js](https://img.shields.io/badge/coding%20style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/) [![npm-license](https://img.shields.io/npm/l/mongo-current-op.svg?style=flat-square&colorB=007EC6)](https://spdx.org/licenses/ISC)

## installation

```
npm install -g mongo-current-op

# or

npx mongo-current-op
```

## usage

```
~/D/p/mongo-current-op (master →) npm start

> mongo-current-op@1.0.0 start /Users/christian/Documents/projects/mongo-current-op
> node $npm_package_main

--------------------------
aggregate on "collection"
[{"$unwind":"$subDocs"},{"$group":{"_id":{"status":"$status","subDocs":"$subDocs"},"count":{"$sum":1}}},{"$sort":{"count":-1}}]
~/D/p/mongo-current-op (master →)
```
