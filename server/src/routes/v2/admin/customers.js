const express = require('express')
const {
  findCustomersHandler,
  addCustomerHandler,
  patchCustomerHandler,
} = require('src/handlers/admin/customers')

const {
  customerMiddleware,
  customerIdMiddleware,
  putCustomerMiddleware,
  searchCustomersMiddleware,
} = require('src/middlewares/schemaMiddlewares/admin/customerMiddlewares')

const router = express.Router()

router.get('/', searchCustomersMiddleware, findCustomersHandler)
router.post('/', customerMiddleware, addCustomerHandler)
router.put(
  '/:customerId',
  customerIdMiddleware,
  putCustomerMiddleware,
  patchCustomerHandler
)

module.exports = router
