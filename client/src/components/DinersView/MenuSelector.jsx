import React from 'react'
import {
  MenuItem, Select, Typography, useTheme,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useKitchenMenusById } from '../../hooks/kitchens'

function MenuOptionsBanner() {
  const theme = useTheme()
  const { kitchenId, menuId } = useParams()
  const { navigate } = useNavigate()
  const { menus } = useKitchenMenusById(kitchenId)

  const handleChange = (event) => {
    navigate('', { state: { menuId: event.target.value } })
  }

  if (menus?.length === 1) {
    return (
      <Typography
        sx={{ minWidth: 120, color: theme.palette.common.white }}
      >
        {menus[0].name}
      </Typography>
    )
  }

  return (
    <Select
      sx={{ minWidth: 120, color: theme.palette.common.white }}
      value={menuId}
      onChange={handleChange}
      variant="standard"
    >
      {
        menus?.map((menu) => (
          <MenuItem key={menu.id} value={menu.id}>{menu.name}</MenuItem>
        ))
      }
    </Select>
  )
}

export default MenuOptionsBanner
