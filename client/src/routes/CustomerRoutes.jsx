import React from 'react'
import { Route, Navigate } from 'react-router-dom'

import CustomersView from 'views/CustomerView'
import ProtectedRoute from 'components/ProtectedRoute'
import DishPage from 'components/CustomersView/DishPage'
import DishesPage from 'components/CustomersView/DishesPage'
import MenuPage from 'components/CustomersView/MenuPage'
import MenusPage from 'components/CustomersView/MenusPage'
import KitchenPage from 'components/CustomersView/KitchenPage'
import OverviewPage from 'components/CustomersView/OverviewPage'
import CustomerLoginPage from 'components/CustomersView/CustomerLoginPage'

const CustomerRoutes = () => (
  <Route path="customers" element={<CustomersView />}>
    <Route index element={<Navigate replace to="/customers/login" />} />
    <Route path="login" element={<CustomerLoginPage />} />

    <Route
      path="overview"
      element={
        <ProtectedRoute>
          <OverviewPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="generalInfo"
      element={
        <ProtectedRoute>
          <KitchenPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="dishes"
      element={
        <ProtectedRoute>
          <DishesPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="dishes/:dishId"
      element={
        <ProtectedRoute>
          <DishPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="menus"
      element={
        <ProtectedRoute>
          <MenusPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="menus/:menuId"
      element={
        <ProtectedRoute>
          <MenuPage />
        </ProtectedRoute>
      }
    />
  </Route>
)

export default CustomerRoutes
