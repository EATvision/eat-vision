import { Box, useTheme } from '@mui/material'
import React from 'react'

export default function FixedBottomConrainer({ children }) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'fixed',
        padding: theme.spacing(2),
        bottom: 0,
        right: 0,
        width: '100%',
      }}
    >
      {children}
    </Box>
  )
}
