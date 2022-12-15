import React, { useState } from 'react'
import { Route, Navigate } from 'react-router-dom'

import Settings from 'components/DinersView/Settings'
import MenuPage from 'components/DinersView/MenuPage'
import MenusPage from 'components/DinersView/MenusPage'
import DishesPage from 'components/DinersView/DishesPage'
import KitchenPage from 'components/DinersView/KitchenPage'
import KitchensPage from 'components/DinersView/KitchensPage'
import GreetingPage from 'components/DinersView/GreetingPage'
import FiltersWizardPage from 'components/DinersView/FiltersWizardPage'
import ServiceWizardPage from 'components/DinersView/ServiceWizardPage'

import DinerView from '../views/DinerView'
import MyOrderPage from 'components/DinersView/MyOrderPage'

const DinersRoutes = () => {
  const [dishes, setDishes] = useState({ total: [], filtered: [] })

  return (
    <Route path="/diners" element={<DinerView dishes={dishes} />}>
      <Route index path="kitchens" element={<KitchensPage />} />
      <Route path="kitchens/:kitchenId" element={<KitchenPage />}>
        <Route path="menus" element={<MenusPage />} />
        <Route path="menus/:menuId" element={<MenuPage />}>
          <Route index element={<GreetingPage />} />
          <Route
            path="filters/:step"
            element={<FiltersWizardPage dishes={dishes} />}
          />

          <Route path="service" element={<ServiceWizardPage />} />

          <Route
            path="dishes"
            element={<DishesPage dishes={dishes} setDishes={setDishes} />}
          />

          <Route path="myorder" element={<MyOrderPage />} />
        </Route>
      </Route>
      <Route
        path="filters"
        element={<Navigate replace to="/diners/filters/1" />}
      />
      <Route
        path="filters/:step"
        element={<FiltersWizardPage dishes={dishes} />}
      />
      <Route path="settings" element={<Settings />} />
    </Route>
  )
}

export default DinersRoutes
