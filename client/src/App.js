
import React from "react"
import { Routes, Route } from "react-router-dom";

import RestaurantsPage from './views/RestaurantsPage'

import "./App.css";


function App() {

  return (
    <div className="App">
      <h1>Welcome to React Router!</h1>
      <Routes>
        <Route path="/restaurants" element={<RestaurantsPage />} />
      </Routes>
    </div>
  );
}

export default App;