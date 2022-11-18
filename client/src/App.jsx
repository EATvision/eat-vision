import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import { ThemeProvider } from '@mui/material'
import ProtectedRoute from './components/ProtectedRoute'
import AdminView from './views/AdminView'

import DinersRoutes from './routes/DinersRoutes'
import CustomerRoutes from './routes/CustomerRoutes'

import LoginPage from './views/Login'

import { getToken, setAuthToken } from './utils/token'

import './App.css'
import getTheme from './theme'
import AdminRoutes from 'routes/AdminRoutes'

function App() {
  const token = getToken()
  setAuthToken(token)

  return (
    <ThemeProvider theme={getTheme()}>
      <Routes>
        <Route path="/" element={<Navigate replace to="/diners/kitchens" />} />

        <Route path="/login" element={<LoginPage />} />

        { DinersRoutes() }
        { CustomerRoutes() }
        { AdminRoutes() }

        <Route
          path="admin"
          element={
            <ProtectedRoute>
              <AdminView />
            </ProtectedRoute>
          }
        ></Route>

        <Route
          path="*"
          element={
            <main style={{ padding: '1rem' }}>
              <p>There&apos;s nothing here!</p>
            </main>
          }
        />
      </Routes>
    </ThemeProvider>
  )
}

export default App
