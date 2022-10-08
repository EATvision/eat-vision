import React from 'react'
import {
  Routes, Route, Navigate,
} from 'react-router-dom'

import i18next from 'i18next'
import DishesPage from './components/DinersView/DishesPage'

import DinerView from './views/DinerView'
import KitchensPage from './components/DinersView/KitchensPage'
import KitchenPage from './components/DinersView/KitchenPage'
import GreetingPage from './components/DinersView/GreetingPage'
import FiltersWizardPage from './components/DinersView/FiltersWizardPage'
import MenusPage from './components/DinersView/MenusPage'
import MenuPage from './components/DinersView/MenuPage'

import CustomerView from './views/CustomerView'

import { defaultFilters } from './utils/filters'
import './App.css'
import DishesManagerPage from './components/CustomersView/DishesManagerPage/DishesManagerPage'
import OverviewPage from './components/CustomersView/OverviewPage'
import MenusManagerPage from './components/CustomersView/MenusManagerPage/MenusManagerPage'
import DishPage from './components/CustomersView/DishesManagerPage/DishPage'

function App() {
  const [filters, setFilters] = React.useState(defaultFilters)
  const [dishes, setDishes] = React.useState({ total: [], filtered: [] })

  document.body.dir = i18next.dir()

  return (

    <Routes>
      <Route path="/" element={<Navigate replace to="/diners/kitchens" />} />
      <Route path="/diners" element={<DinerView />}>
        <Route index path="kitchens" element={<KitchensPage />} />
        <Route path="kitchens/:kitchenId" element={<KitchenPage />}>
          <Route path="menus" element={<MenusPage />} />
          <Route path="menus/:menuId" element={<MenuPage filters={filters} setDishes={setDishes} />}>
            <Route index element={<GreetingPage setFilters={setFilters} />} />
            <Route path="filters/:step" element={<FiltersWizardPage dishes={dishes} filters={filters} setFilters={setFilters} />} />
            <Route path="dishes" element={<DishesPage filters={filters} dishes={dishes} setDishes={setDishes} />} />
          </Route>
        </Route>

        <Route path="filters" element={<Navigate replace to="/diners/filters/1" />} />
        <Route path="filters/:step" element={<FiltersWizardPage dishes={dishes} filters={filters} setFilters={setFilters} />} />
      </Route>

      <Route path="customers" element={<CustomerView />}>
        <Route index path="overview" element={<OverviewPage />} />
        <Route path="dishes" element={<DishesManagerPage />} />
        <Route path="dishes/:dishId" element={<DishPage />} />
        <Route path="menus" element={<MenusManagerPage />} />
      </Route>

      <Route
        path="*"
        element={(
          <main style={{ padding: '1rem' }}>
            <p>There&apos;s nothing here!</p>
          </main>
          )}
      />
    </Routes>

  )
}

export default App
