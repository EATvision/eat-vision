import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { Backdrop, CircularProgress } from '@mui/material'

import { useAuth } from 'contexts/auth'

export default function ProtectedRoute({ children }) {
  const location = useLocation()
  const { isAuth, isLoading } = useAuth()

  if (isLoading) {
    return (
      <Backdrop sx={{ backgroundColor: 'transparent' }} open>
        <CircularProgress />
      </Backdrop>
    )
  }

  if (isAuth) return children

  return <Navigate to="/customers/login" replace state={{ from: location }} />
}
