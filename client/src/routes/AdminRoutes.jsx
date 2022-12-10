import React from 'react'
import { Navigate, Route } from 'react-router-dom'

import AdminView from 'views/AdminView'
import LoginView from 'views/LoginView'

import DietsView from 'components/AdminView/DietsTab'
import ProtectedRoute from 'components/ProtectedRoute'
import FoodGroupsView from 'components/AdminView/FoodGroupsTab'
import IngrdientsView from 'components/AdminView/ingredientsTab'
import CustomersView from 'components/AdminView/CustomersTab'

const AdminRoutes = () => (
  <Route
    path="admin"
    element={
      <ProtectedRoute>
        <AdminView />
      </ProtectedRoute>
    }
  >
    <Route index element={<Navigate replace to="/admin/login" />} />
    <Route
      path="login"
      element={<LoginView defaultLoginOrigin="/admin/customers" />}
    />
    <Route
      path="customers"
      element={
        <ProtectedRoute>
          <CustomersView />
        </ProtectedRoute>
      }
    />
    <Route
      path="ingredients"
      element={
        <ProtectedRoute>
          <IngrdientsView />
        </ProtectedRoute>
      }
    />
    <Route
      path="foodGroups"
      element={
        <ProtectedRoute>
          <FoodGroupsView />
        </ProtectedRoute>
      }
    />
    <Route
      path="diets"
      element={
        <ProtectedRoute>
          <DietsView />
        </ProtectedRoute>
      }
    />
  </Route>
)

export default AdminRoutes
