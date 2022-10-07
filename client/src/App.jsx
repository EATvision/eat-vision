import React from 'react'
import {
  Routes, Route, Navigate,
} from 'react-router-dom'

import i18next from 'i18next'
import { Box } from '@mui/material'
import DishesPage from './views/DishesPage'
import KitchensPage from './views/KitchensPage'
import KitchenPage from './views/KitchenPage'
import GreetingPage from './views/GreetingPage'
import FiltersWizardPage from './views/FiltersWizardPage'
import MenusPage from './views/MenusPage'
import MenuPage from './views/MenuPage'
import CustomerPage from './views/CustomerPage'

import { defaultFilters } from './utils/filters'
import './App.css'
import NavBar from './components/NavBar'

function App() {
  const [filters, setFilters] = React.useState(defaultFilters)
  const [dishes, setDishes] = React.useState({ total: [], filtered: [] })

  document.body.dir = i18next.dir()

  return (
    <Box
      className="App"
      sx={{
        position: 'relative',
        paddingTop: '40px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NavBar />
      <Box
        sx={{
          height: 'calc(100vh - 40px)',
          position: 'relative',
        }}
      >

        <Routes>
          <Route path="/" element={<Navigate replace to="/kitchens" />} />
          <Route path="/kitchens" element={<KitchensPage />} />
          <Route path="/kitchens/:kitchenId" element={<KitchenPage />}>
            <Route path="menus" element={<MenusPage />} />
            <Route path="menus/:menuId" element={<MenuPage filters={filters} setDishes={setDishes} />}>
              <Route index element={<GreetingPage setFilters={setFilters} />} />
              <Route path="filters/:step" element={<FiltersWizardPage dishes={dishes} filters={filters} setFilters={setFilters} />} />
              <Route path="dishes" element={<DishesPage filters={filters} dishes={dishes} setDishes={setDishes} />} />
            </Route>
          </Route>

          <Route path="/admin/kitchens/:kitchenId" element={<CustomerPage />} />

          <Route
            path="*"
            element={(
              <main style={{ padding: '1rem' }}>
                <p>There&apos;s nothing here!</p>
              </main>
          )}
          />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
