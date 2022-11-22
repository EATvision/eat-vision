import yup from 'schemas/yup'

const kitchenValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  image: yup
    .array()
    .of(
      yup.object().shape({
        url: yup.string().url(),
      })
    )
    .default(undefined),
  website: yup
    .string()
    .url('Website url must be valid')
    .required('Website is required'),
  location: yup
    .array()
    .of(yup.string())
    .required('Location is required')
    .min(1, 'You must provide at least one location'),
  intentions: yup
    .array()
    .of(yup.string())
    .required('Intensions are required')
    .min(1, 'You must provide at least one intension'),
  currency: yup.string().required('Currency is required').nullable(),
})

export default kitchenValidationSchema
