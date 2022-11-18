import { Box, ThemeProvider } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from '../components/DinersView/Footer'
import NavBar from '../components/DinersView/NavBar'
import getTheme from '../theme'
import RTL from '../components/RTL'
import useIsRTL from '../hooks/useRTL'

const NAV_BAR_HEIGHT = 48
const FOOTER_HEIGHT = 50

function DinerView({ filters, dishes }) {
  const isRTL = useIsRTL()

  return (
    <ThemeProvider theme={getTheme(isRTL)}>
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

<<<<<<< HEAD
        {dishes?.total?.length > 0 && (
          <Footer filters={filters} dishes={dishes} />
        )}
=======
        {
          dishes?.total?.length > 0
          && (
            <Footer
              filters={filters}
              dishes={dishes}
            />
          )
        }
>>>>>>> 034a5bd (changed eslint indentation)
      </Box>
    </ThemeProvider>
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
