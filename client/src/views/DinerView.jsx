import { Box, ThemeProvider } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from 'components/DinersView/Footer'
import NavBar from 'components/DinersView/NavBar'
import getTheme from '../theme'
import RTL from 'components/RTL'
import useIsRTL from '../hooks/useRTL'
import { ProvideDinerUser } from 'contexts/diner'

function DinerView() {
  const isRTL = useIsRTL()

  return (
    <ProvideDinerUser>
      <ThemeProvider theme={getTheme(isRTL)}>
        <Box
          className="App"
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
          }}
        >
          <NavBar />
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              flex: 1,
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </ThemeProvider>
    </ProvideDinerUser>
  )
}

function WrappedDinerView(props) {
  const isRTL = useIsRTL()

  return isRTL ? (
    <RTL>
      <DinerView {...props} />
    </RTL>
  ) : (
    <DinerView {...props} />
  )
}

export default WrappedDinerView
