import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import BackIcon from '@mui/icons-material/ArrowBack'

import { useKitchenById, useKitchenMenusById } from 'hooks/kitchens'

function KitchenHeader() {
  const navigate = useNavigate()
  const location = useLocation()
  const { kitchenId, menuId } = useParams()
  const { i18n } = useTranslation()

  const { kitchen } = useKitchenById(kitchenId)
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

  React.useEffect(() => {
    if (kitchen) {
      i18n.changeLanguage(kitchen.locale)
    }
  }, [kitchen, i18n])

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
