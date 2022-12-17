import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import BackIcon from '@mui/icons-material/ArrowBack'

import { useV1KitchenById, useKitchenMenusById } from 'hooks/kitchens'

function KitchenHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const { kitchenId, menuId } = useParams()

  const { kitchen } = useV1KitchenById(kitchenId)
  const { menus } = useKitchenMenusById(kitchenId)

  const handleClickBack = () => {
    if (location.pathname.includes('/dishes'))
      return navigate(`/kitchens/${kitchenId}/menus/${menuId}/filters`)
    if (
      location.pathname === `/kitchens/${kitchenId}/menus/${menuId}/filters` &&
      menus.length === 1
    )
      return navigate(`/kitchens/${kitchenId}/menus/${menuId}`)
    if (
      location.pathname === `/kitchens/${kitchenId}/menus/${menuId}` &&
      menus.length === 1
    )
      return navigate('/kitchens')

    return navigate(-1)
  }

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="back"
          sx={{ mr: 2 }}
          onClick={handleClickBack}
        >
          <BackIcon />
        </IconButton>
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="back"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {kitchen.name}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default KitchenHeader
