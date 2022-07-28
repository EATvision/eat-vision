import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import RestaurantsPage from './views/RestaurantsPage'
import RestaurantPage from './views/RestaurantPage'

import './App.css'

function App() {
  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/" element={<Navigate replace to="/restaurants" />} />
        <Route path="/restaurants" element={<RestaurantsPage />} />
        <Route path="/restaurants/:restaurantId" element={<RestaurantPage />} />
        <Route
          path="*"
          element={(
            <main style={{ padding: '1rem' }}>
              <p>There's nothing here!</p>
            </main>
          )}
        />
      </Routes>
    </div>
  )
}

export default App
