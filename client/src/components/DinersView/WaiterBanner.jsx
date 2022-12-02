import React from 'react'
import { Avatar, Box, Paper, Grow, Typography, useTheme } from '@mui/material'
import waiterSrc from '../../images/waiter_transparent_halfbody.png'
import useIsRTL from 'hooks/useRTL'
const WAITER_AVATAR_WIDTH = 100

function WaiterBanner({ title, subtitle }) {
  const theme = useTheme()
  const isRTL = useIsRTL()

  return (
    <Paper
      square
      elevation={0}
      sx={{
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
        position: 'relative',
        margin: `${theme.spacing(5)} ${theme.spacing(2)}`,
        marginBottom: theme.spacing(2),
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
            width: 80,
            borderRadius: 50,
            backgroundColor: theme.palette.secondary.main,
            position: 'absolute',
            transform: isRTL ? 'rotate(30deg)' : 'rotate(-30deg)',
            right: 10,
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
          margin: 'auto 0px',
          position: 'relative',
          right: theme.spacing(2),
        }}
      >
        <Grow direction="up" in key={title}>
          <Paper
            elevation={3}
            sx={{
              marginBottom: theme.spacing(2),
              position: 'relative',
              borderTopLeftRadius: 0,
              padding: `0 ${theme.spacing(1)}`,
            }}
          >
            {isRTL ? <RTLTriangle /> : <LTRTriangle />}
            <Typography
              sx={{
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
            sx={{
              position: 'relative',
              left: theme.spacing(2),
              padding: `0 ${theme.spacing(1)}`,
              borderTopLeftRadius: 0,
            }}
          >
            {isRTL ? <RTLTriangle /> : <LTRTriangle />}

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
        top: 0,
        right: -8,
      }}
    >
      <path
        opacity=".13"
        d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z"
      ></path>
      <path
        fill="currentColor"
        d="M5.188 0H0v11.193l6.467-8.625C7.526 1.156 6.958 0 5.188 0z"
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
        left: -8,
      }}
    >
      <path
        opacity=".13"
        fill="#0000000"
        d="M1.533 3.568 8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"
      ></path>
      <path
        fill="currentColor"
        d="M1.533 2.568 8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"
      ></path>
    </svg>
  )
}

export default WaiterBanner
