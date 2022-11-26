import yup from 'schemas/yup'

const menuValidationSchema = yup.object({
  name: yup.string().required('Name is required'),
  kitchen: yup.string().required('Kitchen is required'),
  description: yup.string().required('Description is required'),
  categories: yup.array().of(yup.string()).nullable(),
})

export default menuValidationSchema
