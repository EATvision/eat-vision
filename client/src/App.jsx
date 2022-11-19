import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import MenuPage from './components/DinersView/MenuPage'
import ProtectedRoute from './components/ProtectedRoute'
import MenusPage from './components/DinersView/MenusPage'
import DishesPage from './components/DinersView/DishesPage'
import KitchenPage from './components/DinersView/KitchenPage'
import KitchensPage from './components/DinersView/KitchensPage'
import GreetingPage from './components/DinersView/GreetingPage'
import OverviewPage from './components/CustomersView/OverviewPage'
import GeneralInfoPage from './components/CustomersView/KitchenPage'
import FiltersWizardPage from './components/DinersView/FiltersWizardPage'
import DishPage from './components/CustomersView/DishesManagerPage/DishPage'
import CustomerLoginPage from './components/CustomersView/CustomerLoginPage'
import MenusManagerPage from './components/CustomersView/MenusManagerPage/MenusManagerPage'
import DishesManagerPage from './components/CustomersView/DishesManagerPage/DishesManagerPage'

import LoginPage from './views/Login'
import DinerView from './views/DinerView'
import CustomerView from './views/CustomerView'
import AdminView from './views/AdminView'
=======
import DinersRoutes from './routes/DinersRoutes'
import CustomerRoutes from './routes/CustomerRoutes'

import LoginPage from './views/Login'
>>>>>>> 4b8b3bd (split routes to files - future proofing :))
=======
import LoginPage from 'components/Login'
=======
>>>>>>> 2c65beb (remove old login)
import ProtectedRoute from 'components/ProtectedRoute'
import AdminView from 'views/AdminView'

import DinersRoutes from 'routes/DinersRoutes'
import CustomerRoutes from 'routes/CustomerRoutes'
>>>>>>> f375654 (add login step and /serve reoute)

import './App.css'
import getTheme from './theme'

function App() {
  return (
    <ThemeProvider theme={getTheme()}>
      <Routes>
        <Route path="/" element={<Navigate replace to="/diners/kitchens" />} />

        {DinersRoutes()}
        {CustomerRoutes()}

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
