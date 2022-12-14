const { Router } = require('express')
const router = Router()

const allergens = require('../../data/new/allergens.json')

router.get('/', (req, res) => {
  res.send(allergens)
})


module.exports = router