import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Box, useTheme, Stack, FormLabel, Chip, Badge,
} from '@mui/material'

import { useKitchenById } from '../../../hooks/kitchens'

export default function DishRecipeChips({
  data, label, recipeType, onSelect = () => {}, selectedComponents = [],
}) {
  const theme = useTheme()
  const { kitchenId } = useParams()
  const { kitchen } = useKitchenById(kitchenId)

  const handleClickChip = (componentId) => () => {
    onSelect(componentId)
  }

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ alignItems: 'center', marginBottom: theme.spacing(2) }}
    >
      <FormLabel sx={{ textAlign: 'initial', minWidth: 75 }}>
        {label}
        :
      </FormLabel>
      <Box sx={{ textAlign: 'initial' }}>
        {
            data.recipe[recipeType].map((component) => {
              const componentsExcludableComponentsFilteredOut = component?.recipe?.excludable?.filter(
                (c) => c.isFilteredOut,
              )
              return (
                <Badge
                  variant="dot"
                  color="error"
                  key={component.id}
                  invisible={!componentsExcludableComponentsFilteredOut?.length}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                >
                  <Chip
                    variant="outlined"
                    disabled={(component.isMainComponentFilteredOut || component.isFilteredOut)}
                    onClick={handleClickChip(component.id)}
                    selected={selectedComponents.includes(component.id)}
                    sx={{
                      textDecoration: (component.isMainComponentFilteredOut || component.isFilteredOut) ? 'line-through' : 'none',
                    }}
                    label={`${component.name} ${component.price > 0 ? `(+${component.price}${kitchen?.currency})` : ''}`}
                  />
                </Badge>
              )
            })
        }
      </Box>
    </Stack>
  )
}
