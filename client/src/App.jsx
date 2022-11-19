import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'

import DinersRoutes from 'routes/DinersRoutes'
import CustomerRoutes from 'routes/CustomerRoutes'

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

        {DinersRoutes()}
        {CustomerRoutes()}
        {AdminRoutes()}

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
