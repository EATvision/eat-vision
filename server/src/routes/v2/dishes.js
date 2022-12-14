const _omit = require('lodash/omit')
const _keyBy = require('lodash/keyBy')
const { Router } = require('express')
const createHttpError = require('http-errors')

const { getCollectionOperations, getDBId } = require('utils/db')
const { getModifiedDishes } = require('src/utils/dishes')

const customersCollectionOperations = getCollectionOperations('customers')
const kitchensCollectionOperations = getCollectionOperations('kitchens')
const menusCollectionOperations = getCollectionOperations('menus')
const categoriesCollectionOperations = getCollectionOperations('categories')
const dishesCollectionOperations = getCollectionOperations('dishes')
const ingredientsCollectionOperations = getCollectionOperations('ingredients')

const router = Router()

const getQueryAggregation = (query) => {
  const aggregation = []

  if (query.search) {
    aggregation.push({
      $search: {
        index: 'default',
        text: {
          query: query.search,
          path: {
            wildcard: '*',
          },
        },
      },
    })
  }

  if (query.kitchen) {
    aggregation.push({
      $match: { kitchen: { $in: query.kitchen.split(',') } },
    })
  }

  aggregation.push({ $skip: query.skip || 0 }, { $limit: query.limit || 10000 })

  return aggregation
}

router.get('/', async (req, res, next) => {
  try {
    const aggregation = getQueryAggregation(req.query)
    const dishes = await dishesCollectionOperations.aggregate(aggregation)

    return res.send(dishes)
  } catch (error) {
    const message = `Could not get dishes: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.get('/:dishId', async (req, res, next) => {
  const { dishId } = req.params
  try {
    const dish = await dishesCollectionOperations.findOne({
      $or: [{ _id: getDBId(dishId) }, { id: dishId }],
    })

    if (!dish) {
      return next(createHttpError(404, `Dish ${dishId} not found`))
    }

    return res.send(dish)
  } catch (error) {
    const message = `Could not get dishes: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.post('/', async (req, res, next) => {
  const newDish = req.body

  try {
    const newId = getDBId()
    const { value: insertedDish } =
      await dishesCollectionOperations.findOneAndReplace(
        { id: newId },
        {
          ...newDish,
          id: newId.toString(),
          _id: newId,
        },
        { upsert: true }
      )

    return res.status(201).send(insertedDish)
  } catch (error) {
    const message = `Could not add new dish: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.put('/:dishId', async (req, res, next) => {
  const { dishId } = req.params
  const newDish = req.body

  try {
    const { value: updatedDish } =
      await dishesCollectionOperations.findOneAndReplace(
        { $or: [{ _id: getDBId(dishId) }, { id: dishId }] },
        _omit(newDish, '_id')
      )

    return res.send(updatedDish)
  } catch (error) {
    const message = `Could not update dish ${dishId}: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.delete('/:dishId', async (req, res, next) => {
  const { dishId } = req.params

  try {
    const { value: deletedDish } =
      await dishesCollectionOperations.findOneAndDelete({
        $or: [{ _id: getDBId(dishId) }, { id: dishId }],
      })

    return res.send(deletedDish)
  } catch (error) {
    const message = `Could not delete dish ${dishId}: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.post('/search', async (req, res, next) => {
  const {
    body: { kitchenId, menuId, filters },
  } = req
  try {
    const relevantKitchen = await kitchensCollectionOperations.findOne({ $or: [{ _id: getDBId(kitchenId) }, { id: kitchenId }] })
    const relevantMenu = await menusCollectionOperations.findOne({
      $and: [
        { $or: [{ kitchens: relevantKitchen.id }, { kitchens: relevantKitchen._id }] },
        { $or: [{ _id: getDBId(menuId) }, { id: menuId }] },
      ]
    })
    const relevantCategories = await categoriesCollectionOperations.find({
      $or: [{ menus: relevantMenu.id }, { menus: relevantMenu._id }]
    })
    const relevantCategoriesIds = relevantCategories.reduce((acc, category) => {
      return [...acc, getDBId(category._id), category.id]
    }, []).filter(Boolean)

    const relevantDishes = await dishesCollectionOperations.find({
      categories: { $in: relevantCategoriesIds }
    }).map(d => ({ ...d, _id: getDBId(d._id) }))

    const dishesBy_Id = _keyBy(relevantDishes, '_id')
    const dishesById = _keyBy(relevantDishes, 'id')
    const dishesByIds = { ...dishesBy_Id, ...dishesById }

    const relevantCustomers = await customersCollectionOperations.find({ kitchens: { $in: kitchenId } })
    const relevantCustomersId = relevantCustomers.map(c => getDBId(c._id))

    const relevantIngredients = await ingredientsCollectionOperations.find({
      $or: [
        { owners: { $exists: false } },
        { owners: { $in: relevantCustomersId } },
      ]
    }).map(ing => ({ ...ing, _id: getDBId(ing._id) }))

    const ingredientsBy_Id = _keyBy(relevantIngredients, '_id')
    const ingredientsById = _keyBy(relevantIngredients, 'id')
    const ingredientsByIds = { ...ingredientsBy_Id, ...ingredientsById }

    const modifiedDishes = getModifiedDishes(relevantDishes, filters, { dishesById: dishesByIds, ingredientsById: ingredientsByIds })

    res.send({ totalDishes: modifiedDishes, filteredDishes: modifiedDishes })
  } catch (error) {
    const message = `Could search dishes: ${error.message}`
    return next(createHttpError(500, message))
  }
})


module.exports = router
