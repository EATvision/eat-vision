const express = require('express')

const usersRoutes = require('./users')
const menusRoutes = require('./menus')
const dishesRoutes = require('./dishes')
const dinersRoutes = require('./diners')
const kitchensRoutes = require('./kitchens')
const locationsRoutes = require('./locations')
const categoriesRoutes = require('./categories')
const ingredientsRoutes = require('./ingredients')

const router = express.Router()

router.use('/users', usersRoutes)
router.use('/menus', menusRoutes)
router.use('/dishes', dishesRoutes)
router.use('/diners', dinersRoutes)
router.use('/kitchens', kitchensRoutes)
router.use('/locations', locationsRoutes)
router.use('/categories', categoriesRoutes)
router.use('/ingredients', ingredientsRoutes)

module.exports = router
