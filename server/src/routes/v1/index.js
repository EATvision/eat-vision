
const express = require('express')

const dietsRoutes = require('./diets')
const allergensRoutes = require('./allergens')
const kitchensRoutes = require('./kitchens')
const ingredientsRoutes = require('./ingredients')
const foodGroupsRoutes = require('./foodGroups')

const router = express.Router()

router.use('/kitchens', kitchensRoutes)
router.use('/foodGroups', foodGroupsRoutes)
router.use('/ingredients', ingredientsRoutes)
router.use('/diets', dietsRoutes)
router.use('/allergens', allergensRoutes)

router.get('/', (req, res) => {
  res.json({ message: 'OK' })
})

module.exports = router
