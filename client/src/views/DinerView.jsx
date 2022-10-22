import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/DinersView/NavBar'

const NAV_BAR_HEIGHT = 48

function DinerView({ filters }) {
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
          height: `calc(100vh - ${NAV_BAR_HEIGHT}px)`,
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
        }}
      >

        <Outlet />
      </Box>
    </Box>
  )
}

export default DinerView
