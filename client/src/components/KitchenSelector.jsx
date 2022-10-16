import React from 'react'
import {
  FormControl, InputLabel, MenuItem, Select, Typography,
} from '@mui/material'
import { useKitchens } from '../hooks/kitchens'
import { useKitchen } from '../contexts/kitchen'

function KitchenSelector() {
  const { kitchens, isLoading } = useKitchens()
  const { kitchenId, onSetKitchenId } = useKitchen()

  React.useEffect(() => {
    if (!kitchenId && kitchens?.[0]?.id) {
      onSetKitchenId(kitchens[0].id)
    }
  }, [kitchens])

  const handleChange = (event) => {
    onSetKitchenId(event.target.value)
  }

  if (!kitchenId || isLoading) return null

  if (kitchens?.length === 0) {
    return (
      <Typography>{kitchens[0].name}</Typography>
    )
  }

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">kitchens</InputLabel>
      <Select
        value={kitchenId}
        onChange={handleChange}
      >
        {
          kitchens?.map((kitchen) => (
            <MenuItem key={kitchen.id} value={kitchen.id}>{kitchen.name}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  )
}

export default KitchenSelector
