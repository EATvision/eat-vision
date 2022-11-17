const { Router } = require('express')
const router = Router()

const { getCollectionOperations } = require('utils/db')

const dinersCollection = getCollectionOperations('diners')

router.post('/anonymous', async (req, res) => {
  const {
    body: { filters },
  } = req
  const anonymousDiner = { filters }
  // const response = await dinersCollection?.insertOne(anonymousDiner)
  res.status(201)
})

module.exports = router
