const { Router } = require('express')
const router = Router()
const keyBy = require('lodash/keyBy')
const _intersection = require('lodash/intersection')


const menus = require('../../data/new/menus.json')
const dishes = require('../../data/new/dishes.json')
const kitchens = require('../../data/new/kitchens.json')
const categories = require('../../data/new/categories.json')
const ingredients = require('../../data/new/ingredients.json')
const workingHours = require('../../data/new/workingHours.json')

const dishesById = keyBy(dishes, 'id')
const ingredientsById = keyBy(ingredients, 'id')
const workingHoursById = keyBy(workingHours, 'id')

const { getModifiedDishes } = require('utils/dishes')

router.get('/', (_req, res) => {
  res.send(kitchens)
})

router.get('/:kitchenId', (req, res) => {
  const { params: { kitchenId } } = req
  res.send(kitchens.find(kitchen => kitchen.id === kitchenId))
})

router.get('/:kitchenId/categories', (req, res) => {
  res.send(categories)
})

router.get('/:kitchenId/menus', (req, res) => {
  const { params: { kitchenId } } = req
  const kitchenMenus = menus.filter(menu => menu?.kitchens?.includes(kitchenId))
  const kitchenMenusFullData = kitchenMenus.map(menu => ({
    ...menu,
    workingHours: menu.workingHours.map(workingHourId => (workingHoursById[workingHourId]))
  }))

  res.send(kitchenMenusFullData)
})

router.get('/:kitchenId/menus/:menuId/categories', (req, res) => {
  const { params: { kitchenId, menuId } } = req

  const relevanceMenu = menus.find(menu => menu?.id === menuId)
  const relevantCategories = categories.filter(category => relevanceMenu?.categories?.includes(category.id))
  res.send(relevantCategories)
})

router.post('/:kitchenId/menus/:menuId/dishes/search', (req, res) => {
  const {
    params: { kitchenId, menuId },
    body: filters,
  } = req

  const relevantMenu = menus.find(menu => menu.id === menuId)
  const relevantDishes = dishes.filter(dish => _intersection(relevantMenu?.categories, dish?.categories)?.length > 0)

  const modifiedDishes = getModifiedDishes(relevantDishes, filters, { dishesById, ingredientsById })

  res.send({ totalDishes: relevantDishes, filteredDishes: modifiedDishes })
})

module.exports = router