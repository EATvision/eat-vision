import React from 'react'
import { Avatar, Box, Paper, Grow, Typography, useTheme } from '@mui/material'
import waiterSrc from '../../images/waiter_transparent_halfbody.png'

const WAITER_AVATAR_WIDTH = 100

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
        margin: `${theme.spacing(5)} 0`,
        background: 'none',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          margin: `0 ${theme.spacing(1)}`,
          top: 0,
        }}
      >
        <Box
          sx={{
            height: 120,
            width: 75,
            borderRadius: 50,
            backgroundColor: theme.palette.secondary.main,
            position: 'absolute',
            transform: 'rotate(35deg)',
            right: 20,
          }}
        ></Box>
        <Avatar
          src={waiterSrc}
          variant="square"
          sx={{
            width: WAITER_AVATAR_WIDTH,
            height: WAITER_AVATAR_WIDTH,
          }}
        />
      </Box>

      <Box
        sx={{
          width: 270,
          margin: 'auto 0px',
          position: 'relative',
          right: theme.spacing(2),
        }}
      >
        <Grow direction="up" in key={title}>
          <Paper elevation={3} sx={{ marginBottom: theme.spacing(2) }}>
            <Typography
              variant="h5"
              sx={{
                lineHeight: 1.2,
                letterSpacing: -0.5,
              }}
            >
              {title}
            </Typography>
          </Paper>
        </Grow>

        <Grow direction="up" in key={`${title}-${subtitle}`} timeout={1000}>
          <Paper
            elevation={3}
            sx={{ position: 'relative', left: theme.spacing(2) }}
          >
            <Typography variant="h5" sx={{ letterSpacing: -0.5, fontSize: 18 }}>
              {subtitle}
            </Typography>
          </Paper>
        </Grow>
      </Box>
    </Paper>
  )
}

export default WaiterBanner
