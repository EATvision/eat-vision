const Joi = require('joi')

const customerName = Joi.string()
const isSuspendedSchema = Joi.boolean()
const customerKitchens = Joi.array().items(Joi.string()).min(0).max(100)

const customerSchema = Joi.object({
  name: customerName.required(),
  isSuspended: isSuspendedSchema.required(),
  kitchens: customerKitchens.required(),
})

const optionalCustomerSchema = Joi.object({
  name: customerName,
  kitchens: customerKitchens,
  isSuspended: isSuspendedSchema,
})

const customerIdSchema = Joi.object({
  customerId: Joi.string(), //TODO - add secureString
})

const searchUsersSchema = Joi.object({
  page: Joi.number(),
  searchQuery: Joi.string(),
  limit: Joi.number().min(1).max(50),
})
module.exports = {
  customerSchema,
  customerIdSchema,
  searchUsersSchema,
  optionalCustomerSchema,
}
