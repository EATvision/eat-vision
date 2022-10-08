import React from 'react'
import {
  Routes, Route, Navigate,
} from 'react-router-dom'

import i18next from 'i18next'
import DishesPage from './components/DinersPage/DishesPage'
import CustomerPage from './views/CustomerPage'

import KitchensPage from './components/DinersPage/KitchensPage'
import KitchenPage from './components/DinersPage/KitchenPage'
import GreetingPage from './components/DinersPage/GreetingPage'
import FiltersWizardPage from './components/DinersPage/FiltersWizardPage'
import MenusPage from './components/DinersPage/MenusPage'
import MenuPage from './components/DinersPage/MenuPage'

import DinerPage from './views/DinerPage'

import { defaultFilters } from './utils/filters'
import './App.css'

function App() {
  const [filters, setFilters] = React.useState(defaultFilters)
  const [dishes, setDishes] = React.useState({ total: [], filtered: [] })

  document.body.dir = i18next.dir()

  return (

    <Routes>
      <Route path="/" element={<Navigate replace to="/diners/kitchens" />} />
      <Route path="/diners" element={<DinerPage />}>
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

      <Route path="customers/kitchens/:kitchenId/" element={<CustomerPage />} />

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
