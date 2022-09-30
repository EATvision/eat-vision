import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Box, useTheme, Stack, FormLabel, Chip, Badge,
} from '@mui/material'

import { useKitchenById } from '../../hooks/kitchens'

export default function DishRecipeChips({ data, label, recipeType }) {
  const theme = useTheme()
  const { kitchenId } = useParams()
  const { kitchen } = useKitchenById(kitchenId)
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{ alignItems: 'center', marginBottom: theme.spacing(2) }}
    >
      <FormLabel sx={{ textAlign: 'initial', width: 120 }}>
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
                  color="secondary"
                  key={component.id}
                  invisible={!componentsExcludableComponentsFilteredOut?.length}
                >
                  <Chip
                    variant="outlined"
                    disabled={component.isMainComponentFilteredOut}
                    sx={{
                      textDecoration: component.isMainComponentFilteredOut ? 'line-through' : 'none',
                    }}
                    label={(
                      <>
                        {component.name}
                        {component.price > 0 && `(+${component.price}${kitchen.currency})`}
                      </>
                        )}
                  />
                </Badge>
              )
            })
        }
      </Box>
    </Stack>
  )
}
