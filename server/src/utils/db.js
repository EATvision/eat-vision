const logger = require('utils/logger')
const { MongoClient, ObjectId } = require('mongodb')

const internals = {
  client: null,
}

const connectDb = async (uri) => {
  logger.info('MongoDB: connecting...')

  internals.client = await MongoClient.connect(uri, {
    retryWrites: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  logger.info('MongoDB: connected')
}

const getDBId = (id) => (ObjectId.isValid(id) ? ObjectId(id) : ObjectId())

const getCollectionOperations = (collectionName) => ({
  find: (filter, options) =>
    internals.client
      .db()
      .collection(collectionName)
      .find(filter, options)
      .toArray(),

  findOne: (filter, options) =>
    internals.client.db().collection(collectionName).findOne(filter, options),

  insertOne: (doc, options) =>
    internals.client.db().collection(collectionName).insertOne(doc, options),

  findOneAndUpdate: (filter, update, options) =>
    internals.client
      .db()
      .collection(collectionName)
      .findOneAndUpdate(filter, update, {
        returnDocument: 'after',
        ...options,
      }),

  findOneAndReplace: (filter, replacement, options) =>
    internals.client
      .db()
      .collection(collectionName)
      .findOneAndReplace(filter, replacement, {
        returnDocument: 'after',
        ...options,
      }),

  aggregate: (pipeline, options) =>
    internals.client
      .db()
      .collection(collectionName)
      .aggregate(pipeline, options),
})

module.exports = {
  getDBId,
  connectDb,
  getCollectionOperations,
}
