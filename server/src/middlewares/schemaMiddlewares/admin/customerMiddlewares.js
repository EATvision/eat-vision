const {
  customerSchema,
  customerIdSchema,
  optionalCustomerSchema,
  searchUsersSchema,
} = require('src/schemas/admin/customers')

const validator = require('express-joi-validation').createValidator({})

const customerMiddleware = validator.body(customerSchema)
const customerIdMiddleware = validator.params(customerIdSchema)
const searchCustomersMiddleware = validator.query(searchUsersSchema)
const putCustomerMiddleware = validator.body(optionalCustomerSchema)
module.exports = {
  customerMiddleware,
  customerIdMiddleware,
  putCustomerMiddleware,
  searchCustomersMiddleware,
}
