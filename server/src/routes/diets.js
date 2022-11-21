const { Router } = require('express')
const router = Router()

const diets = require('../data/new/diets.json')

router.get('/', (req, res) => {
  res.send(diets)
})


module.exports = router