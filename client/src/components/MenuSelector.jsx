import React from 'react'
import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useKitchenMenusById } from '../hooks/kitchens'

function MenuOptionsBanner() {
  const { kitchenId, menuId } = useParams()
  const { navigate } = useNavigate()
  const { menus } = useKitchenMenusById(kitchenId)

  const handleChange = (event) => {
    navigate('', { state: { menuId: event.target.value } })
  }

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">menus</InputLabel>
      <Select
        value={menuId}
        label="menus"
        onChange={handleChange}
      >
        {
          menus?.map((menu) => (
            <MenuItem key={menu.id} value={menu.id}>{menu.name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

export default MenuOptionsBanner
