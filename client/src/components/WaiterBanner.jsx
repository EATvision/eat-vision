import React from 'react'
import {
  Avatar, Box, Typography, useTheme,
} from '@mui/material'
import waiterSrc from '../images/waiter_transparent_halfbody.png'

function WaiterBanner({ title, subtitle }) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: theme.palette.primary.main,
        padding: theme.spacing(1),
        margin: theme.spacing(1),
        position: 'relative',
        height: 80,
      }}
    >
      <Box>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="p">{subtitle}</Typography>
      </Box>
      <Avatar
        src={waiterSrc}
        sx={{
          width: 75,
          height: 75,
          position: 'absolute',
          right: 0,
          top: 0,
        }}
      />
    </Box>
  )
}

export default WaiterBanner
