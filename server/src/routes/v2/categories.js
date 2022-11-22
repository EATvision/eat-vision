const _omit = require('lodash/omit')
const { Router } = require('express')
const createHttpError = require('http-errors')

const { getCollectionOperations, getDBId } = require('utils/db')

const categoriesCollectionOperations = getCollectionOperations('categories')

const router = Router()

const getQueryAggregation = (query) => {
  const aggregation = []

  if (query.search) {
    aggregation.push({
      $search: {
        index: 'default',
        text: {
          query: query.search,
          fuzzy: {},
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

  aggregation.push({ $skip: query.skip || 0 }, { $limit: query.limit || 1000 })

  return aggregation
}

router.get('/', async (req, res, next) => {
  try {
    const aggregation = getQueryAggregation(req.query)
    const categories = await categoriesCollectionOperations.aggregate(
      aggregation
    )

    return res.send(categories)
  } catch (error) {
    const message = `Could not get categories: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.get('/:categoryId', async (req, res, next) => {
  const { categoryId } = req.params
  try {
    const category = await categoriesCollectionOperations.findOne({
      $or: [{ _id: getDBId(categoryId) }, { id: categoryId }],
    })

    if (!category) {
      return next(createHttpError(404, `Category ${categoryId} not found`))
    }

    return res.send(category)
  } catch (error) {
    const message = `Could not get categories: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.post('/', async (req, res, next) => {
  const newCategory = req.body

  try {
    const newId = getDBId()
    const { value: insertedCategory } =
      await categoriesCollectionOperations.findOneAndReplace(
        { id: newId },
        {
          ...newCategory,
          id: newId.toString(),
          _id: newId,
        },
        { upsert: true }
      )

    return res.status(201).send(insertedCategory)
  } catch (error) {
    const message = `Could not add new category: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.put('/:categoryId', async (req, res, next) => {
  const { categoryId } = req.params
  const newCategory = req.body

  try {
    const { value: updatedCategory } =
      await categoriesCollectionOperations.findOneAndReplace(
        { $or: [{ _id: getDBId(categoryId) }, { id: categoryId }] },
        _omit(newCategory, '_id')
      )

    return res.send(updatedCategory)
  } catch (error) {
    const message = `Could not update category ${categoryId}: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.delete('/:categoryId', async (req, res, next) => {
  const { categoryId } = req.params

  try {
    const { value: deletedCategory } =
      await categoriesCollectionOperations.findOneAndDelete({
        $or: [{ _id: getDBId(categoryId) }, { id: categoryId }],
      })

    return res.send(deletedCategory)
  } catch (error) {
    const message = `Could not delete category ${categoryId}: ${error.message}`
    return next(createHttpError(500, message))
  }
})

module.exports = router
