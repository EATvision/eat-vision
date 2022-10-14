const { client: dbClient, getDBId } = require('../db')
const database = dbClient.db('eat');
const usersCollection = database.collection('users');

const getUserById = async (id) => {
  const res = await usersCollection.findOne({ _id: getDBId(id) })
  return res
}

module.exports = {
  getUserById
}