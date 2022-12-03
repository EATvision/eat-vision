import React from 'react'
import { MenuItem, Select, Typography, useTheme } from '@mui/material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useKitchenMenusById } from 'hooks/kitchens'

function MenuOptionsBanner() {
  const theme = useTheme()
  const { kitchenId, menuId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { menus } = useKitchenMenusById(kitchenId)

  const handleChange = React.useCallback(
    (event) => {
      const splittedLocation = location.pathname.split('/')
      const menuIdIndex = splittedLocation.indexOf('menus') + 1
      splittedLocation[menuIdIndex] = event.target.value

      const newLocation = splittedLocation.join('/')
      navigate(newLocation)
    },
    [location, navigate]
  )

  if (!menus) return null

  if (menus?.length === 1) {
    return (
      <Typography
        sx={{
          color: theme.palette.common.white,
        }}
      >
        {menus[0].name.toLocaleUpperCase()}
      </Typography>
    )
  }

  return (
    <Select
      sx={{ color: theme.palette.common.white }}
      value={menuId}
      onChange={handleChange}
      variant="standard"
      disableUnderline
      autoWidth
    >
      {menus?.map((menu) => (
        <MenuItem key={menu.id} value={menu.id}>
          {menu.name.toLocaleUpperCase()}
        </MenuItem>
      ))}
    </Select>
  )
}

export default MenuOptionsBanner
