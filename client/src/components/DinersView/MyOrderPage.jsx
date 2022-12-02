import React from 'react'
import { Box } from '@mui/material'
import Footer from './Footer'

function MyOrderPage() {
  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        maxWidth: 500,
        margin: 'auto',
      }}
    >
      YOUR ORDER
      <Footer />
    </Box>
  )
}

export default MyOrderPage
