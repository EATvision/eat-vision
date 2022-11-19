import React from 'react'
import { Route, Navigate } from 'react-router-dom'

import GeneralInfoPage from 'components/CustomersView/GeneralInfoPage'

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
          <GeneralInfoPage />
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
