const _omit = require('lodash/omit')
const { Router } = require('express')
const createHttpError = require('http-errors')

const { getCollectionOperations, getDBId } = require('utils/db')

const ingredientsCollectionOperations = getCollectionOperations('ingredients')

const router = Router()

const getQueryAggregation = (query) => {
  const aggregation = []

  if (query.search) {
    aggregation.push(
      {
        $search: {
          index: 'default',
          text: {
            query: query.search,
            path: {
              wildcard: '*',
            },
          },
        },
      }
      // TODO: should ingredients be filtered by isSearchable?
      // { $match: { isSearchable: true } }
    )
  }

  if (query.id) {
    aggregation.push({
      $match: {
        id: { $in: query.id.split(',') },
      },
    })
  }

  aggregation.push({ $skip: query.skip || 0 }, { $limit: query.limit || 100 })

  return aggregation
}

router.get('/', async (req, res, next) => {
  try {
    const aggregation = getQueryAggregation(req.query)
    const ingredients = await ingredientsCollectionOperations.aggregate(
      aggregation
    )

    return res.send(ingredients)
  } catch (error) {
    const message = `Could not get ingredients: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.get('/:ingredientId', async (req, res, next) => {
  const { ingredientId } = req.params
  try {
    const ingredient = await ingredientsCollectionOperations.findOne({
      $or: [{ _id: getDBId(ingredientId) }, { id: ingredientId }],
    })

    if (!ingredient) {
      return next(createHttpError(404, `Ingredient ${ingredientId} not found`))
    }

    return res.send(ingredient)
  } catch (error) {
    const message = `Could not get ingredients: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.post('/', async (req, res, next) => {
  const newIngredient = req.body

  try {
    const newId = getDBId()
    const { value: insertedIngredient } =
      await ingredientsCollectionOperations.findOneAndReplace(
        { id: newId },
        {
          ...newIngredient,
          id: newId.toString(),
          _id: newId,
        },
        { upsert: true }
      )

    return res.status(201).send(insertedIngredient)
  } catch (error) {
    const message = `Could not add new ingredient: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.put('/:ingredientId', async (req, res, next) => {
  const { ingredientId } = req.params
  const newIngredient = req.body

  try {
    const { value: updatedIngredient } =
      await ingredientsCollectionOperations.findOneAndReplace(
        { $or: [{ _id: getDBId(ingredientId) }, { id: ingredientId }] },
        _omit(newIngredient, '_id')
      )

    return res.send(updatedIngredient)
  } catch (error) {
    const message = `Could not update ingredient ${ingredientId}: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.delete('/:ingredientId', async (req, res, next) => {
  const { ingredientId } = req.params

  try {
    const { value: deletedIngredient } =
      await ingredientsCollectionOperations.findOneAndDelete({
        $or: [{ _id: getDBId(ingredientId) }, { id: ingredientId }],
      })

    return res.send(deletedIngredient)
  } catch (error) {
    const message = `Could not delete ingredient ${ingredientId}: ${error.message}`
    return next(createHttpError(500, message))
  }
})

module.exports = router
