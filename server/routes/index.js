
const express = require('express')

const kitchensRoutes = require('./kitchens')
const ingredientsRoutes = require('./ingredients')

const router = express.Router()

router.use('/kitchens', kitchensRoutes)
router.use('/ingredients', ingredientsRoutes)

router.get("/", (req, res) => {
  res.json({ message: 'OK' })
})

module.exports = router
