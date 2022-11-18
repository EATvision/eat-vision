
const express = require('express')

const dishesRoutes = require('./dishes')
const dinersRoutes = require('./diners')
const dietsRoutes = require('./diets')
const kitchensRoutes = require('./kitchens')
const ingredientsRoutes = require('./ingredients')

const router = express.Router()

router.use('/kitchens', kitchensRoutes)
router.use('/ingredients', ingredientsRoutes)
router.use('/diets', dietsRoutes)
router.use('/dishes', dishesRoutes)
router.use('/diners', dinersRoutes)

router.get('/', (req, res) => {
  res.json({ message: 'OK' })
})

module.exports = router