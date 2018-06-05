## installation

```
npm install -g mongo-current-op
```

## usage

```
~/D/p/mongo-current-op (master →) npm start database_name

> mongo-current-op@1.0.0 start /Users/christian/Documents/projects/mongo-current-op
> node $npm_package_main "database_name"

--------------------------
aggregate on "collection"
[{"$unwind":"$subDocs"},{"$group":{"_id":{"status":"$status","subDocs":"$subDocs"},"count":{"$sum":1}}},{"$sort":{"count":-1}}]
~/D/p/mongo-current-op (master →)
```
