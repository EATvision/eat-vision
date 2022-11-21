const _omit = require('lodash/omit')
const { Router } = require('express')
const createHttpError = require('http-errors')

const { getCollectionOperations, getDBId } = require('utils/db')

const dishesCollectionOperations = getCollectionOperations('dishes')

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

module.exports = router
