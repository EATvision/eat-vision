import React from 'react'
import { Route, Navigate } from 'react-router-dom'

import ProtectedRoute from 'components/ProtectedRoute'
import OverviewPage from 'components/CustomersView/OverviewPage'
import GeneralInfoPage from 'components/CustomersView/GeneralInfoPage'
import DishPage from 'components/CustomersView/DishesManagerPage/DishPage'
import MenusManagerPage from 'components/CustomersView/MenusManagerPage/MenusManagerPage'
import DishesManagerPage from 'components/CustomersView/DishesManagerPage/DishesManagerPage'

import CustomersView from 'views/CustomerView'
import LoginView from 'views/LoginView'

const CustomerRoutes = () => (
  <Route path="customers" element={<CustomersView />}>
    <Route index element={<Navigate replace to="/customers/login" />} />
    <Route path="login" element={<LoginView />} />
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
