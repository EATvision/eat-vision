const createHttpError = require('http-errors')

const _uniq = require('lodash/uniq')

const { getCollectionOperations, getDBId } = require('src/utils/db')

const customerOperations = getCollectionOperations('customers')
const kitchenOperations = getCollectionOperations('kitchens')

const findCustomersHandler = async (req, res, next) => {
  try {
    const query = {}
    const queryOptions = {
      limit: 100,
    }
    const customerId = await customerOperations.find(query, queryOptions)

    return res.send(customerId)
  } catch (error) {
    const message = `Could not add user: ${error.message}`
    return next(createHttpError(500, message))
  }
}

const addCustomerHandler = async (req, res, next) => {
  try {
    const customer = req.body

    const kitchens = customer.kitchens

    customer.kitchens = _uniq(customer.kitchens)

    const kitchenIds = kitchens.map((kitchenId) => getDBId(kitchenId))

    const kitchen = await kitchenOperations.count({
      _id: { $in: kitchenIds },
    })

    if (!kitchen) {
      return next(createHttpError(404, 'Invalid kitchens'))
    }

    const customerId = await customerOperations.insertOne(customer)

    return res.send(customerId)
  } catch (error) {
    const message = `Could not add user: ${error.message}`
    return next(createHttpError(500, message))
  }
}

const patchCustomerHandler = async (req, res, next) => {
  try {
    const customer = req.body
    const { customerId } = req.params

    const findQuery = {
      $or: [{ _id: getDBId(customerId) }],
    }

    if (customer.kitchens) {
      customer.kitchens = _uniq(customer.kitchens)
      const kitchenIds = customer.kitchens.map((kitchenId) =>
        getDBId(kitchenId)
      )

      const kitchen = await kitchenOperations.count({
        _id: { $in: kitchenIds },
      })

      if (!kitchen) {
        return next(createHttpError(404, 'Invalid kitchens'))
      }
    }

    const updateQuery = {
      $set: {
        ...(customer.name && { name: customer.name }),
        ...(customer.kitchens && { kitchens: customer.kitchens }),
      },
    }

    const updated = await customerOperations.findOneAndUpdate(
      findQuery,
      updateQuery
    )

    if (!updated.ok) {
      return next(createHttpError(404, 'Failed updating customer info'))
    }
    return res.send(updated.value)
  } catch (error) {
    const message = `Could not update user: ${error.message}`
    return next(createHttpError(500, message))
  }
}

module.exports = {
  findCustomersHandler,
  addCustomerHandler,
  patchCustomerHandler,
}
