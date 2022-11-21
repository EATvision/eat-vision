import yup from 'schemas/yup'

const locationValidationSchema = yup.object({
  streetAddress: yup.string().required('Street Address is required'),
  city: yup.string().required('City is required'),
  country: yup.string().required('Country is required'),
})

export default locationValidationSchema
