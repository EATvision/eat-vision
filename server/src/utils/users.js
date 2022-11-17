const { getCollectionOperations, getDBId } = require('utils/db')

const usersCollection = getCollectionOperations('users')

const getUserById = async (id) => {
  const res = await usersCollection.findOne({ _id: getDBId(id) })
  return res
}

module.exports = {
  getUserById,
}
