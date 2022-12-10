import React from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { Link } from 'react-router-dom'

const LoginView = () => {
  const theme = useTheme()
  // const token = getToken()
  // const location = useLocation()
  // const origin = location.state?.from?.pathname || defaultLoginOrigin

  // if (token) return <Navigate to={origin} />

  return (
    <Box
      sx={{
        width: '80%',
        maxWidth: 300,
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        margin: 'auto',
      }}
    >
      <Typography sx={{ marginBottom: theme.spacing(2) }}>
        You are not logged in!
      </Typography>
      <Link to="/login">
        <Button variant="contained" color="secondary" fullWidth>
          Login
        </Button>
      </Link>
    </Box>
  )
}

export default LoginView
