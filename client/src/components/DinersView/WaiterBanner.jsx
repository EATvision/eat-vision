import React from 'react'
import { Avatar, Box, Paper, Grow, Typography, useTheme } from '@mui/material'
import waiterSrc from '../../images/waiter_transparent_halfbody.png'
import useIsRTL from 'hooks/useRTL'
const WAITER_AVATAR_WIDTH = 70

function WaiterBanner({ title, subtitle }) {
  const theme = useTheme()
  const isRTL = useIsRTL()

  return (
    <Paper
      square
      elevation={1}
      sx={{
        display: 'flex',
        alignItems: 'start',
        position: 'relative',
        padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
        backgroundColor: '#E9E9E9',
        minHeight: 100,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Box
          sx={{
            height: 80,
            width: 63,
            borderRadius: 50,
            backgroundColor: theme.palette.secondary.main,
            position: 'absolute',
            top: 0,
            [isRTL ? 'left' : 'right']: 0,
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
          position: 'relative',
          top: `calc(8px + ${theme.spacing(1)})`,
        }}
      >
        <Grow direction="up" in key={title}>
          <Paper
            elevation={3}
            sx={{
              position: 'relative',
              borderTopLeftRadius: 0,
              padding: `4px ${theme.spacing(1)}`,
            }}
          >
            {isRTL ? <RTLTriangle /> : <LTRTriangle />}
            <Typography
              sx={{
                fontSize: '1.25rem',
                letterSpacing: -0.5,
                fontWeight: 'bold',
              }}
            >
              {title}
            </Typography>

            <Typography sx={{ letterSpacing: -0.5 }}>{subtitle}</Typography>
          </Paper>
        </Grow>
      </Box>
    </Paper>
  )
}

const RTLTriangle = () => {
  return (
    <svg
      viewBox="0 0 8 13"
      width="8"
      height="13"
      className=""
      style={{
        color: 'white',
        position: 'absolute',
        right: -26,
        top: 0,
        width: 41,
        height: 20,
      }}
    >
      <path
        opacity=".13"
        d="M 11 1 H 0 v 11.193 l 15 -9.193 C 17 2 16 1 13 1 z"
      ></path>
      <path
        fill="currentColor"
        d="M 11 0 H 0 v 11.193 l 15 -9.193 C 17 1 16 0 12 0 z"
      ></path>
    </svg>
  )
}

const LTRTriangle = () => {
  return (
    <svg
      viewBox="0 0 8 13"
      width="8"
      height="13"
      className=""
      style={{
        color: 'white',
        position: 'absolute',
        top: 0,
        left: -26,
        width: 41,
        height: 20,
        transform: 'scaleX(-1)',
      }}
    >
      <path
        opacity=".13"
        d="M 11 1 H 0 v 11.193 l 15 -9.193 C 17 2 16 1 13 1 z"
      ></path>
      <path
        fill="currentColor"
        d="M 11 0 H 0 v 11.193 l 15 -9.193 C 17 1 16 0 12 0 z"
      ></path>
    </svg>
  )
}

export default WaiterBanner
