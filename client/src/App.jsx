import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import RestaurantsPage from './views/RestaurantsPage'
import RestaurantPage from './views/RestaurantPage'
import FiltersPage from './views/FiltersPage'
import MenuPage from './views/MenuPage'

import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate replace to="/restaurants" />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/:restaurantId" element={<RestaurantPage />}>
          <Route path="filters" element={<FiltersPage />} />
          <Route path="menu" element={<MenuPage />} />
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
