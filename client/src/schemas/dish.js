import yup from 'schemas/yup'

const compositionItemSchema = yup
  .object()
  .shape({
    id: yup.string().required(),
    price: yup.number().min(0),
    putaside: yup.boolean(),
    type: yup.string().oneOf(['ingredient', 'dish']).required(),
  })
  .default(undefined)

const dishValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  kitchen: yup.string().required('Kitchen is required'),
  description: yup.string(),
  image: yup.object().shape({
    url: yup.string().url(),
  }),
  price: yup.number().min(0).required('Price is required'),
  categories: yup.array().of(yup.string()).required('Categories are required'),
  composition: yup
    .object()
    .shape({
      addable: yup.array().of(compositionItemSchema),
      mandatory: yup.array().of(compositionItemSchema),
      excludible: yup.array().of(compositionItemSchema),
      choice: yup.array().of(compositionItemSchema),
    })
    .default(undefined),
})

export default dishValidationSchema
