import React from 'react'
import {
  Avatar, Box, Typography, useTheme,
} from '@mui/material'
import waiterSrc from '../../images/waiter_transparent_halfbody.png'

const WAITER_AVATAR_WIDTH = 60

function WaiterBanner({ title, subtitle }) {
  const theme = useTheme()

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: theme.palette.primary.main,
        margin: theme.spacing(1),
        position: 'relative',
        height: 80,
      }}
    >
      <Box
        sx={{
          width: 270,
          marginLeft: `${WAITER_AVATAR_WIDTH}px`,
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="p">{subtitle}</Typography>
      </Box>
      <Avatar
        src={waiterSrc}
        sx={{
          width: WAITER_AVATAR_WIDTH,
          height: WAITER_AVATAR_WIDTH,
          position: 'relative',
          right: 10,
          top: 0,
        }}
      />
    </Box>
  )
}

export default WaiterBanner
