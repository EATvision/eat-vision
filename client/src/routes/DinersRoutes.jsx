import React, { useState } from 'react'
import { Route, Navigate } from 'react-router-dom'

import MenuPage from '../components/DinersView/MenuPage'
import MenusPage from '../components/DinersView/MenusPage'
import DishesPage from '../components/DinersView/DishesPage'
import KitchenPage from '../components/DinersView/KitchenPage'
import KitchensPage from '../components/DinersView/KitchensPage'
import GreetingPage from '../components/DinersView/GreetingPage'
import FiltersWizardPage from '../components/DinersView/FiltersWizardPage'

import DinerView from '../views/DinerView'

import { defaultFilters } from '../utils/filters'

const DinersRoutes = () => {
  const [filters, setFilters] = useState(defaultFilters)
  const [dishes, setDishes] = useState({ total: [], filtered: [] })
  
  return (
    <Route
      path="/diners"
      element={<DinerView filters={filters} dishes={dishes} />}
    >
      <Route index path="kitchens" element={<KitchensPage />} />
      <Route path="kitchens/:kitchenId" element={<KitchenPage />}>
        <Route path="menus" element={<MenusPage />} />
        <Route
          path="menus/:menuId"
          element={<MenuPage filters={filters} setDishes={setDishes} />}
        >
          <Route index element={<GreetingPage setFilters={setFilters} />} />
          <Route
            path="filters/:step"
            element={
              <FiltersWizardPage
                dishes={dishes}
                filters={filters}
                setFilters={setFilters}
              />
            }
          />
          <Route
            path="dishes"
            element={
              <DishesPage
                filters={filters}
                dishes={dishes}
                setDishes={setDishes}
              />
            }
          />
        </Route>
      </Route>

      <Route
        path="filters"
        element={<Navigate replace to="/diners/filters/1" />}
      />
      <Route
        path="filters/:step"
        element={
          <FiltersWizardPage
            dishes={dishes}
            filters={filters}
            setFilters={setFilters}
          />
        }
      />
    </Route>
  )
}

export default DinersRoutes