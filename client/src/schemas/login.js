import yup from 'schemas/yup'

const loginSchema = yup.object({
  username: yup.string('Enter your username').required('Username is required'),
  password: yup.string('Enter your password').required('Password is required'),
})

export default loginSchema
