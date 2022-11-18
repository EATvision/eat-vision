import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Select,
  MenuItem,
  InputLabel,
  Typography,
  FormControl,
} from '@mui/material'
import { Add } from '@mui/icons-material'
import { useKitchens } from 'hooks/kitchens'
import { useKitchen } from 'contexts/kitchen'
import { addKitchen } from 'api/kitchens'

function KitchenSelector() {
  const { t } = useTranslation()
  const { kitchenId, onSetKitchenId } = useKitchen()
  const { kitchens, isLoading, mutate: mutateKitchens } = useKitchens()

  useEffect(() => {
    const firstKitchenId = kitchens?.[0].id
    if (!kitchenId && firstKitchenId) {
      onSetKitchenId(firstKitchenId)
    }
  }, [kitchenId, kitchens, onSetKitchenId])

  const handleChange = async (event) => {
    const value = event.target.value
    if (value === 'new') {
      try {
        const { insertedId: insertedKitchenId } = await addKitchen({
          name: 'New Kitchen',
        })
        await mutateKitchens()
        onSetKitchenId(insertedKitchenId)
      } catch (error) {
        console.log('Could not add kitchen')
      }
    } else {
      onSetKitchenId(value)
    }
  }

  if (!kitchenId || isLoading) return null

  if (kitchens?.length === 0) {
    return <Typography>{kitchens[0].name}</Typography>
  }

  return (
    <FormControl sx={{ minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">kitchens</InputLabel>
      <Select value={kitchenId} onChange={handleChange}>
        {kitchens?.map((kitchen) => (
          <MenuItem key={kitchen.id} value={kitchen.id}>
            {kitchen.name}
          </MenuItem>
        ))}
        <MenuItem key={'new'} value={'new'}>
          <Add />
          {t('New Kitchen')}
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default KitchenSelector
