const { MongoClient, ServerApiVersion } = require('mongodb');

const client = process.env.DB_URI && new MongoClient(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

module.exports = client