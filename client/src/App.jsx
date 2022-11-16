import React from 'react'
import {
  Routes, Route, Navigate,
} from 'react-router-dom'
import i18next from 'i18next'
import { ThemeProvider } from '@mui/material'

import MenuPage from './components/DinersView/MenuPage'
import ProtectedRoute from './components/ProtectedRoute'
import MenusPage from './components/DinersView/MenusPage'
import DishesPage from './components/DinersView/DishesPage'
import KitchenPage from './components/DinersView/KitchenPage'
import KitchensPage from './components/DinersView/KitchensPage'
import GreetingPage from './components/DinersView/GreetingPage'
import OverviewPage from './components/CustomersView/OverviewPage'
import GeneralInfoPage from './components/CustomersView/GeneralInfoPage'
import FiltersWizardPage from './components/DinersView/FiltersWizardPage'
import DishPage from './components/CustomersView/DishesManagerPage/DishPage'
import CustomerLoginPage from './components/CustomersView/CustomerLoginPage'
import MenusManagerPage from './components/CustomersView/MenusManagerPage/MenusManagerPage'
import DishesManagerPage from './components/CustomersView/DishesManagerPage/DishesManagerPage'

import LoginPage from './views/Login'
import DinerView from './views/DinerView'
import CustomerView from './views/CustomerView'

import { defaultFilters } from './utils/filters'
import { getToken, setAuthToken } from './utils/token'

import KitchenProvider from './contexts/kitchen'

import './App.css'
import theme from './theme'

function App() {
  const [filters, setFilters] = React.useState(defaultFilters)
  const [dishes, setDishes] = React.useState({ total: [], filtered: [] })

  document.body.dir = i18next.dir()

  const token = getToken()
  setAuthToken(token)

  return (
    <ThemeProvider theme={theme}>
      <KitchenProvider>
        <Routes>
          <Route path="/" element={<Navigate replace to="/diners/kitchens" />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/diners" element={<DinerView filters={filters} dishes={dishes} />}>
            <Route index path="kitchens" element={<KitchensPage />} />
            <Route path="kitchens/:kitchenId" element={<KitchenPage />}>
              <Route path="menus" element={<MenusPage />} />
              <Route path="menus/:menuId" element={<MenuPage filters={filters} setDishes={setDishes} />}>
                <Route index element={<GreetingPage setFilters={setFilters} />} />
                <Route path="filters/:step" element={<FiltersWizardPage dishes={dishes} filters={filters} setFilters={setFilters} />} />
                <Route path="dishes" element={<DishesPage filters={filters} dishes={dishes} setDishes={setDishes} />} />
              </Route>
            </Route>

            <Route path="filters" element={<Navigate replace to="/diners/filters/1" />} />
            <Route path="filters/:step" element={<FiltersWizardPage dishes={dishes} filters={filters} setFilters={setFilters} />} />
          </Route>

          <Route path="customers" element={<CustomerView />}>
            <Route index element={<Navigate replace to="/customers/login" />} />
            <Route path="login" element={<CustomerLoginPage />} />
            <Route path="overview" element={<ProtectedRoute><OverviewPage /></ProtectedRoute>} />
            <Route path="generalInfo" element={<ProtectedRoute><GeneralInfoPage /></ProtectedRoute>} />
            <Route path="dishes" element={<ProtectedRoute><DishesManagerPage /></ProtectedRoute>} />
            <Route path="dishes/:dishId" element={<ProtectedRoute><DishPage /></ProtectedRoute>} />
            <Route path="menus" element={<ProtectedRoute><MenusManagerPage /></ProtectedRoute>} />
          </Route>

          <Route
            path="*"
            element={(
              <main style={{ padding: '1rem' }}>
                <p>There&apos;s nothing here!</p>
              </main>
        )}
          />
        </Routes>
      </KitchenProvider>
    </ThemeProvider>
  )
}

export default App
