import React from 'react'
import { Route, Navigate } from 'react-router-dom'

import ProtectedRoute from '../components/ProtectedRoute'
import OverviewPage from '../components/CustomersView/OverviewPage'
import KitchenPage from '../components/CustomersView/KitchenPage'
import DishPage from '../components/CustomersView/DishesManagerPage/DishPage'
import CustomerLoginPage from '../components/CustomersView/CustomerLoginPage'
import MenusManagerPage from '../components/CustomersView/MenusManagerPage/MenusManagerPage'
import DishesManagerPage from '../components/CustomersView/DishesManagerPage/DishesManagerPage'
import CustomersView from '../views/CustomerView'

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
          <DishesManagerPage />
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
          <MenusManagerPage />
        </ProtectedRoute>
      }
    />
  </Route>
)

export default CustomerRoutes
