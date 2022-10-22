import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/DinersView/NavBar'

function DinerView({ filters }) {
  return (
    <Box
      className="App"
      sx={{
        position: 'relative',
        paddingTop: '46px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <NavBar filters={filters} />
      <Box
        sx={{
          height: 'calc(100vh - 46px)',
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
