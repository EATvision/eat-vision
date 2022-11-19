import { Box, Button, Typography, useTheme } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

function CustomerLoginPage() {
  const theme = useTheme()

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

export default CustomerLoginPage
