const Joi = require('joi')

const customerName = Joi.string()
const customerKitchens = Joi.array().items(Joi.string()).min(0).max(100)

const customerSchema = Joi.object({
  name: customerName.required(),
  kitchens: customerKitchens.required(),
})

const optionalCustomerSchema = Joi.object({
  name: customerName,
  kitchens: customerKitchens,
})

const customerIdSchema = Joi.object({
  customerId: Joi.string(), //TODO - future secureString
})
module.exports = {
  customerSchema,
  customerIdSchema,
  optionalCustomerSchema,
}
