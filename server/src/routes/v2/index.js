const express = require('express')

const dinersRoutes = require('./diners')
const kitchensRoutes = require('./kitchens')
const locationsRoutes = require('./locations')
const adminRoutes = require('./admin')

const router = express.Router()

router.use('/diners', dinersRoutes)
router.use('/kitchens', kitchensRoutes)
router.use('/locations', locationsRoutes)
router.use('/admin', adminRoutes)

module.exports = router
