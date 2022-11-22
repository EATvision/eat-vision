const _omit = require('lodash/omit')
const { Router } = require('express')
const createHttpError = require('http-errors')

const categories = require('data/new/categories.json')

const { getModifiedDishes } = require('utils/dishes')
const { getCollectionOperations, getDBId } = require('utils/db')

const menusCollectionOperations = getCollectionOperations('menus')
const dishesCollectionOperations = getCollectionOperations('dishes')
const kitchenCollectionOperations = getCollectionOperations('kitchens')

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const kitchens = await kitchenCollectionOperations.find()

    return res.send(kitchens)
  } catch (error) {
    const message = `Could not get kitchens: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.get('/:kitchenId', async (req, res, next) => {
  const { kitchenId } = req.params
  try {
    const kitchen = await kitchenCollectionOperations.findOne({
      $or: [{ _id: getDBId(kitchenId) }, { id: kitchenId }],
    })

    if (!kitchen) {
      return next(createHttpError(404, `Kitchen ${kitchenId} not found`))
    }

    return res.send(kitchen)
  } catch (error) {
    const message = `Could not get kitchens: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.get('/:kitchenId/categories', (req, res) => {
  res.send(categories)
})

router.get('/:kitchenId/menus', async (req, res, next) => {
  const { kitchenId } = req.params
  try {
    const filter = {
      $or: [{ kitchens: getDBId(kitchenId) }, { kitchens: kitchenId }],
    }
    const menus = await menusCollectionOperations.find(filter)

    return res.send(menus)
  } catch (error) {
    const message = `Could not get menus for kitchen ${kitchenId}: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.get('/:kitchenId/menus/:menuId/categories', async (req, res, next) => {
  const { kitchenId, menuId } = req.params
  try {
    const menu = await menusCollectionOperations.findOne({
      $or: [{ id: menuId }, { _id: getDBId(menuId) }],
    })

    if (!menu) {
      return next(createHttpError(404, `Menu ${menuId} not found`))
    }

    // TODO: save categories in the database
    const menuCategories = categories.filter((category) =>
      menu.categories?.includes(category.id)
    )
    return res.send(menuCategories)
  } catch (error) {
    const message = `Could not get categories for menu ${menuId} in kitchen ${kitchenId}: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.post(
  '/:kitchenId/menus/:menuId/dishes/search',
  async (req, res, next) => {
    const filters = req.body
    const { kitchenId, menuId } = req.params

    try {
      const menu = await menusCollectionOperations.findOne({
        $or: [{ id: menuId }, { _id: getDBId(menuId) }],
      })

      if (!menu) {
        return next(createHttpError(404, `Menu ${menuId} not found`))
      }

      const dishes = await dishesCollectionOperations.find({
        categories: menu.categories,
      })

      // TODO: apply filters though mongo aggregation
      const modifiedDishes = getModifiedDishes(dishes, filters)

      res.send({ totalDishes: modifiedDishes, filteredDishes: modifiedDishes })
    } catch (error) {
      const message = `Could not get dishes for menu ${menuId} in kitchen ${kitchenId}: ${error.message}`
      return next(createHttpError(500, message))
    }
  }
)

router.post('/', async (req, res, next) => {
  const newKitchen = req.body

  try {
    const newId = getDBId()
    const { value: insertedKitchen } =
      await kitchenCollectionOperations.findOneAndReplace(
        { id: newId },
        {
          ...newKitchen,
          _id: newId,
          id: newId.toString(),
        },
        { upsert: true }
      )

    return res.status(201).send(insertedKitchen)
  } catch (error) {
    const message = `Could not add new kitchen: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.put('/:kitchenId', async (req, res, next) => {
  const { kitchenId } = req.params
  const newKitchen = req.body

  try {
    const { value: updatedKitchen } =
      await kitchenCollectionOperations.findOneAndReplace(
        { $or: [{ id: kitchenId }, { _id: getDBId(kitchenId) }] },
        _omit(newKitchen, '_id')
      )

    return res.send(updatedKitchen)
  } catch (error) {
    const message = `Could not update kitchen ${kitchenId}: ${error.message}`
    return next(createHttpError(500, message))
  }
})

module.exports = router
