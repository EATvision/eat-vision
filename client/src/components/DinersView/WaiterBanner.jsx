import React from 'react'
import {
  Avatar, Box, Paper, Typography, useTheme,
} from '@mui/material'
import waiterSrc from '../../images/waiter_transparent_halfbody.png'

const WAITER_AVATAR_WIDTH = 60

function WaiterBanner({ title, subtitle }) {
  const theme = useTheme()

  return (
    <Paper
      square
      elevation={2}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: 270,
          marginLeft: `${WAITER_AVATAR_WIDTH}px`,
        }}
      >
        <Typography variant="p">
          <b>{title}</b>
          <br />
          {subtitle}
        </Typography>
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
    </Paper>
  )
}

export default WaiterBanner
