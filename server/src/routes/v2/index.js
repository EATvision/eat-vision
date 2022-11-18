const express = require('express')

const kitchensRoutes = require('./kitchens')
const locationsRoutes = require('./locations')

const router = express.Router()

router.use('/kitchens', kitchensRoutes)
router.use('/locations', locationsRoutes)

module.exports = router
