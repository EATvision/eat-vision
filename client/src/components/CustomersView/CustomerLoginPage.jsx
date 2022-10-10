import { Button } from '@mui/material'
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/auth'

function CustomerLoginPage() {
  const { token, onLogin } = useAuth()
  const location = useLocation()
  const origin = location.state?.from?.pathname || '/customers/overview'

  if (token) return <Navigate to={origin} />

  return (
    <div>
      <Button
        variant="contained"
        onClick={onLogin}
      >
        Sign In
      </Button>
    </div>
  )
}

export default CustomerLoginPage
