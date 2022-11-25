import React from 'react'
import { Route, Outlet } from 'react-router-dom'

import CustomersView from 'views/CustomerView'
import ProtectedRoute from 'components/ProtectedRoute'
import DishPage from 'components/CustomersView/DishPage'
import DishesPage from 'components/CustomersView/DishesPage'
import MenuPage from 'components/CustomersView/MenuPage'
import MenusPage from 'components/CustomersView/MenusPage'
import KitchenPage from 'components/CustomersView/KitchenPage'
import OverviewPage from 'components/CustomersView/OverviewPage'
import CustomerLoginPage from 'components/CustomersView/Login'
import { AuthProvider } from 'contexts/auth'

const CustomerRoutes = () => (
  <Route
    element={
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    }
  >
    <Route path="customers/login" element={<CustomerLoginPage />} />
    <Route
      path="customers"
      element={
        <ProtectedRoute>
          <CustomersView />
        </ProtectedRoute>
      }
    >
      <Route path="overview" element={<OverviewPage />} />
      <Route path="generalInfo" element={<KitchenPage />} />
      <Route path="dishes" element={<DishesPage />} />
      <Route path="dishes/:dishId" element={<DishPage />} />
      <Route path="menus" element={<MenusPage />} />
      <Route path="menus/:menuId" element={<MenuPage />} />
    </Route>
  </Route>
)

export default CustomerRoutes
