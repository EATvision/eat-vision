import yup from 'schemas/yup'

const recipeItemSchema = yup
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
  recipe: yup
    .object()
    .shape({
      addable: yup.array().of(recipeItemSchema),
      mandatory: yup.array().of(recipeItemSchema),
      excludible: yup.array().of(recipeItemSchema),
      changeable: yup.array().of(recipeItemSchema),
    })
    .default(undefined),
})

export default dishValidationSchema
