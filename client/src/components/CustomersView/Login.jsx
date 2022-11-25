import React from 'react'
import { Form, Formik } from 'formik'
import { Link } from 'react-router-dom'

import {
  Box,
  Backdrop,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from '@mui/material'

import TextInput from 'components/FormInputs/TextInput'

import { useAuth } from 'contexts/auth'

import loginSchema from 'schemas/login'

const initialValues = {
  username: '',
  password: '',
}

const Login = () => {
  const classes = {}
  const { login, isLoading } = useAuth()

  if (isLoading) {
    return (
      <Backdrop className={classes.backdrop} open>
        <CircularProgress />
      </Backdrop>
    )
  }

  const handleSubmit = async ({ username, password }) => {
    const { authenticated } = await login(username, password)
    if (!authenticated) {
      console.log('Not authenticated')
    }
  }

  return (
    <Formik
      isInitialValid={false}
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Container maxWidth="xs" alignSelf="center" justifySelf="center">
          <Stack
            component={Form}
            onSubmit={formik.handleSubmit}
            mt={30}
            direction="column"
            alignItems="stretch"
            spacing={2}
          >
            <Typography variant="h4" fontWeight="bold">
              Login
            </Typography>
            <Stack spacing={0}>
              <TextInput name="username" label="Username" required fullWidth />
              <TextInput
                name="password"
                label="Password"
                type="password"
                required
                fullWidth
              />
            </Stack>
            <Button
              disabled={!formik.isValid || formik.isSubmitting}
              color="primary"
              variant="contained"
              fullWidth
              type="submit"
            >
              Submit
            </Button>
            <Stack direction="row">
              <Link to="/forgot-password">Forgot password</Link>
              <Box flex={1} />
              <Link to="/register">Request access</Link>
            </Stack>
          </Stack>
        </Container>
      )}
    </Formik>
  )
}

export default Login
