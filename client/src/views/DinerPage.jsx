import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/DinersPage/NavBar'

function DinerPage() {
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
          display: 'flex',
          justifyContent: 'center',
        }}
      >

        <Outlet />
      </Box>
    </Box>
  )
}

export default DinerPage
