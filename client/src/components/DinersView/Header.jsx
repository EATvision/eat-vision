import React from 'react'
import { AppBar, Box, Typography, useTheme } from '@mui/material'
import { Link, useParams } from 'react-router-dom'

import { useV1KitchenById } from 'hooks/kitchens'
import MenuSelector from './MenuSelector'
import logo30Src from '../../images/logo30.png'

function Header() {
  const theme = useTheme()
  const { kitchenId, menuId } = useParams()

  const { kitchen } = useV1KitchenById(kitchenId)

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
      <Box
        sx={{
          height: 50,
          width: 50,
          backgroundSize: 'contain',
          backgroundImage: `url(${kitchen?.image?.[0]?.url})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          margin: 'auto',
        }}
      ></Box>

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
        <Box
          sx={{
            width: 40,
            height: 40,
            margin: 'auto',
          }}
        >
          <Link to={`/diners/kitchens/${kitchenId}/menus/${menuId}`}>
            <img
              className="w-full h-full cover object-center group-hover:opacity-75"
              src={logo30Src}
              alt=""
            />
          </Link>
        </Box>
      </Box>
    </AppBar>
  )
}

export default Header
