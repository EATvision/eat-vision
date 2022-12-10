const _omit = require('lodash/omit')
const { Router } = require('express')

const router = Router()

const { getCollectionOperations, getDBId } = require('utils/db')
const authenticateToken = require('src/middlewares/auth')

const dinersCollection = getCollectionOperations('diners')

router.get('/auth', authenticateToken(), async (req, res,) => {
  const {
    user,
  } = req
  if (!user?.phoneNumber) {
    return res.status(401).send()
  }
  const response = await dinersCollection.findOne({ phoneNumber: user?.phoneNumber })

  if (!response) {
    return res.status(404).send()
  }
  res.send(response)
})

router.get('/:id', async (req, res) => {
  const {
    params: { id }
  } = req
  const { data } = await dinersCollection.findOne({ $or: [{ id: id }, { _id: getDBId(id) }] })
  res.send(data)
})


router.post('/', authenticateToken(), async (req, res) => {
  const { body: diner, user } = req

  if (user?.phoneNumber) {
    const existingUser = await dinersCollection.findOne({ phoneNumber: user?.phoneNumber })

    if (existingUser) {
      await dinersCollection.findOneAndReplace(
        { _id: existingUser._id },
        _omit(diner, '_id')
      )
      return res.status(200).send({ ...diner, _id: existingUser._id })
    }
  }

  const anonymousDiner = { ...diner, phoneNumber: user?.phoneNumber }
  const response = await dinersCollection.insertOne(anonymousDiner)
  res.status(201).send({ ...anonymousDiner, _id: response.insertedId.toString() })
})

router.put('/:id', authenticateToken(), async (req, res) => {
  const {
    params: { id },
    body: diner,
    user,
  } = req

  const updatedDiner = { ...diner, phoneNumber: user?.phoneNumber }

  await dinersCollection.findOneAndReplace(
    { $or: [{ id: id }, { _id: getDBId(id) }] },
    _omit(updatedDiner, '_id')
  )
  res.status(200)
})

module.exports = router
