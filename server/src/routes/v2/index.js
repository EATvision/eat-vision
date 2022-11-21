const express = require('express')

const menusRoutes = require('./menus')
const dishesRoutes = require('./dishes')
const dinersRoutes = require('./diners')
const kitchensRoutes = require('./kitchens')
const locationsRoutes = require('./locations')
const categoriesRoutes = require('./categories')
const ingredientsRoutes = require('./ingredients')

const router = express.Router()

router.use('/menus', menusRoutes)
router.use('/dishes', dishesRoutes)
router.use('/diners', dinersRoutes)
router.use('/kitchens', kitchensRoutes)
router.use('/locations', locationsRoutes)
router.use('/categories', categoriesRoutes)
router.use('/ingredients', ingredientsRoutes)

module.exports = router
