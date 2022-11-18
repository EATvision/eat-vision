import { ThemeProvider, Typography } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'

import getTheme from '../theme'
import RTL from '../components/RTL'
import useIsRTL from '../hooks/useRTL'

function AdminView() {
  const isRTL = useIsRTL()

  return (
    <ThemeProvider theme={getTheme(isRTL)}>
      <Typography variant="h1">ADMIN</Typography>
      <Outlet />
    </ThemeProvider>
  )
}

function WrappedAdminView(props) {
  const isRTL = useIsRTL()

  return isRTL ? (
    <RTL>
      <AdminView {...props} />
    </RTL>
  ) : (
    <AdminView {...props} />
  )
}

export default WrappedAdminView
