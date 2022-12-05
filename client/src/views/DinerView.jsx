import { Box, ThemeProvider } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

import getTheme from '../theme'
import RTL from 'components/RTL'
import useIsRTL from 'hooks/useRTL'
import { ProvideDinerUser } from 'contexts/diner'
import { ProvideDinerOrder } from 'contexts/order'

function DinerView() {
  const isRTL = useIsRTL()

  return (
    <ProvideDinerUser>
      <ProvideDinerOrder>
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
      </ProvideDinerOrder>
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
