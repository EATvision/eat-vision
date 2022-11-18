import React from 'react'
import { Route } from 'react-router-dom'
import WrappedAdminView from 'views/AdminView'

import ProtectedRoute from '../components/ProtectedRoute'

const AdminRoutes = () => ( 
  <Route
    path="admin"
    element={
      <ProtectedRoute>
        <WrappedAdminView />
      </ProtectedRoute>
    }
  ></Route>
)

export default AdminRoutes