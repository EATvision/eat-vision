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
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
        position: 'relative',
        margin: `${theme.spacing(1)} 0`,
      }}
    >
      <Box
        sx={{
          width: 270,
          margin: 'auto 0px',
          marginLeft: `${WAITER_AVATAR_WIDTH - 10}px`,
        }}
      >
        <Typography
          sx={{
            lineHeight: 1.2,
            fontWeight: 'bold',
            fontSize: 20,
            letterSpacing: -0.5,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{ letterSpacing: -0.5 }}
        >
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
