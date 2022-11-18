const _omit = require('lodash/omit')
const { Router } = require('express')
const createHttpError = require('http-errors')

const { getCollectionOperations, getDBId } = require('utils/db')

const locationsCollectionOperations = getCollectionOperations('locations')

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const locations = await locationsCollectionOperations.find()

    return res.send(locations)
  } catch (error) {
    const message = `Could not get locations: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.get('/:locationId', async (req, res, next) => {
  const { locationId } = req.params
  try {
    const location = await locationsCollectionOperations.findOne({
      $or: [{ _id: getDBId(locationId) }, { id: locationId }],
    })

    if (!location) {
      return next(createHttpError(404, `Location ${locationId} not found`))
    }

    return res.send(location)
  } catch (error) {
    const message = `Could not get locations: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.post('/', async (req, res, next) => {
  const newLocation = req.body

  try {
    const newId = getDBId()
    const { insertedId } = await locationsCollectionOperations.insertOne({
      ...newLocation,
      id: newId.toString(),
      _id: newId,
    })

    return res.status(201).send({ insertedId })
  } catch (error) {
    const message = `Could not add new location: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.put('/:locationId', async (req, res, next) => {
  const { locationId } = req.params
  const newLocation = req.body

  try {
    const updatedLocation =
      await locationsCollectionOperations.findOneAndReplace(
        { $or: [{ _id: getDBId(locationId) }, { id: locationId }] },
        _omit(newLocation, '_id')
      )

    return res.send(updatedLocation)
  } catch (error) {
    const message = `Could not update location ${locationId}: ${error.message}`
    return next(createHttpError(500, message))
  }
})

module.exports = router
