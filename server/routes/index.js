
const express = require('express')

const restaurantsRoutes = require('./restaurants')
const ingredientsRoutes = require('./ingredients')

const router = express.Router()

router.use('/restaurants', restaurantsRoutes)
router.use('/ingredients', ingredientsRoutes)

router.get("/", (req, res) => {
  res.json({ message: 'OK' })
})

module.exports = router
