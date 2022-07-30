import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import RestaurantsPage from './views/RestaurantsPage'
import RestaurantPage from './views/RestaurantPage'
import GreetingPage from './views/GreetingPage'
import FiltersPage from './views/FiltersPage'
import MenuPage from './views/MenuPage'

import { defaultFilters } from './utils/filters'

import './App.css'

function App() {
  const [filters, setFilters] = React.useState(defaultFilters)
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate replace to="/restaurants" />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/:restaurantId" element={<RestaurantPage />}>
          <Route index element={<GreetingPage />} />
          <Route path="filters" element={<FiltersPage filters={filters} setFilters={setFilters} />} />
          <Route path="menu" element={<MenuPage filters={filters} />} />
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
