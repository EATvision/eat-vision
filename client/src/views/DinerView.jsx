import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../components/DinersView/Footer'
import NavBar from '../components/DinersView/NavBar'

const NAV_BAR_HEIGHT = 48
const FOOTER_HEIGHT = 50

function DinerView({ filters, dishes }) {
  return (
    <Box
      className="App"
      sx={{
        position: 'relative',
        paddingTop: `${NAV_BAR_HEIGHT}px`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NavBar filters={filters} />
      <Box
        sx={{
          height: `calc(100vh - ${NAV_BAR_HEIGHT}px - ${FOOTER_HEIGHT}px)`,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
        }}
      >

        <Outlet />
      </Box>

      {
          dishes?.total?.length > 0
          && (
          <Footer
            filters={filters}
            dishes={dishes}
          />
          )
        }
    </Box>
  )
}

export default DinerView
