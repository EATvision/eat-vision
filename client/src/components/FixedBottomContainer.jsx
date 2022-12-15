import { AppBar, useTheme } from '@mui/material'
import React from 'react'

export default function FixedBottomConrainer({ children }) {
  const theme = useTheme()
  return (
    <AppBar
      position="fixed"
      sx={{
        top: 'auto',
        bottom: 0,
        backgroundColor: '#E9E9E9',
        display: 'flex',
        flexDirection: 'row',
        padding: theme.spacing(2),
        marginTop: 'auto',
      }}
    >
      {children}
    </AppBar>
  )
}
