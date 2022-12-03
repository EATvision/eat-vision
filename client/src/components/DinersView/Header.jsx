import React from 'react'
import { AppBar, Box, Typography, useTheme } from '@mui/material'
import { useParams } from 'react-router-dom'

import { useKitchenById } from 'hooks/kitchens'
import MenuSelector from './MenuSelector'
import logo30Src from '../../images/logo30.png'

function Header() {
  const theme = useTheme()
  const { kitchenId } = useParams()

  const { kitchen } = useKitchenById(kitchenId)

  return (
    <AppBar
      color="default"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        padding: `${theme.spacing(1)}`,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box sx={{ height: 50, margin: 'auto' }}>
        <img
          className="w-full h-full object-center object-fit group-hover:opacity-75"
          src={kitchen?.image?.[0]?.url}
          alt=""
        />
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <MenuSelector />

      <Box sx={{ flexGrow: 1 }} />

      <Box>
        <Typography
          sx={{
            fontSize: 8,
            color: theme.palette.common.white,
            marginBottom: '2px',
          }}
        >
          Powered By
        </Typography>
        <Box sx={{ height: 40, width: 40, margin: 'auto' }}>
          <img
            className="w-full h-full object-center object-fit group-hover:opacity-75"
            src={logo30Src}
            alt=""
          />
        </Box>
      </Box>
    </AppBar>
  )
}

export default Header
