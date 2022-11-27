import React from 'react'
import { Route, Navigate } from 'react-router-dom'

import ProtectedRoute from 'components/ProtectedRoute'
import DishPage from 'components/CustomersView/DishPage'
import MenuPage from 'components/CustomersView/MenuPage'
import MenusPage from 'components/CustomersView/MenusPage'
import DishesPage from 'components/CustomersView/DishesPage'
import OverviewPage from 'components/CustomersView/OverviewPage'
import GeneralInfoPage from 'components/CustomersView/GeneralInfoPage'

import LoginView from 'views/LoginView'
import CustomersView from 'views/CustomerView'

const CustomerRoutes = () => (
  <Route path="customers" element={<CustomersView />}>
    <Route index element={<Navigate replace to="/customers/login" />} />
    <Route
      path="login"
      element={<LoginView defaultLoginOrigin="/customers/overview" />}
    />
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
