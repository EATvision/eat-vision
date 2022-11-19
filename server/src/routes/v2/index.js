const express = require('express')

const kitchensRoutes = require('./kitchens')
const locationsRoutes = require('./locations')
const adminRoutes = require('./admin')

const router = express.Router()

router.use('/kitchens', kitchensRoutes)
router.use('/locations', locationsRoutes)
router.use('/admin', adminRoutes)

module.exports = router
