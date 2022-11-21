import yup from 'schemas/yup'

const categoryValidationSchema = yup.object({
  name: yup.string().required('Category name is required'),
  kitchen: yup.string().required('Kitchen is required'),
})

export default categoryValidationSchema
