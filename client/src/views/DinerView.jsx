import { Box, ThemeProvider } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

import Footer from 'components/DinersView/Footer'
import NavBar from 'components/DinersView/NavBar'
import getTheme from '../theme'
import RTL from 'components/RTL'
import useIsRTL from '../hooks/useRTL'
import { ProvideDinerUser } from 'contexts/diner'

const NAV_BAR_HEIGHT = 48
const FOOTER_HEIGHT = 50

function DinerView({ dishes }) {
  const isRTL = useIsRTL()

  return (
    <ProvideDinerUser>
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
          <NavBar />
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

          {dishes?.total?.length > 0 && <Footer dishes={dishes} />}
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
