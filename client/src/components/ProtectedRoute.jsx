import React from 'react'
import {
  Navigate, useLocation,
} from 'react-router-dom'
import { useAuth } from '../hooks/auth'

export default function ProtectedRoute({ children }) {
  const { token } = useAuth()
  const location = useLocation()

  if (!token) {
    return <Navigate to="/customers/login" replace state={{ from: location }} />
  }

  return children
}
