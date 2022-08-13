import React from 'react'
import {
  Routes, Route, Navigate,
} from 'react-router-dom'

import DishesPage from './views/DishesPage'
import RestaurantsPage from './views/RestaurantsPage'
import RestaurantPage from './views/RestaurantPage'
import GreetingPage from './views/GreetingPage'
import FiltersPage from './views/FiltersPage'
import MenusPage from './views/MenusPage'
import MenuPage from './views/MenuPage'
import { defaultFilters } from './utils/filters'
import './App.css'

function App() {
  const [filters, setFilters] = React.useState(defaultFilters)
  const [dishes, setDishes] = React.useState({ total: [], filtered: [] })

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate replace to="/restaurants" />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/:restaurantId" element={<RestaurantPage />}>
          <Route path="menus" element={<MenusPage />} />
          <Route path="menus/:menuId" element={<MenuPage filters={filters} setDishes={setDishes} />}>
            <Route index element={<GreetingPage />} />
            <Route path="filters" element={<FiltersPage dishes={dishes} filters={filters} setFilters={setFilters} />} />
            <Route path="dishes" element={<DishesPage filters={filters} dishes={dishes} setDishes={setDishes} />} />
          </Route>
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
    </div>
  )
}

export default App
