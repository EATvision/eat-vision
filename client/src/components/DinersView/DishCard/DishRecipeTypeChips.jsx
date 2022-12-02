import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  useTheme,
  Stack,
  FormLabel,
  Badge,
  Typography,
  Divider,
} from '@mui/material'

import { useKitchenById } from 'hooks/kitchens'
import { useGetComponentLabel } from 'hooks/ingredients'

export default function DishRecipeChips({ data, label }) {
  const theme = useTheme()
  const { kitchenId } = useParams()
  const { kitchen } = useKitchenById(kitchenId)

  const getComponentLabel = useGetComponentLabel()
  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        backgroundColor: theme.palette.grey[200],
        padding: theme.spacing(1),
        alignItems: 'center',
        marginBottom: '4px',
      }}
    >
      <FormLabel sx={{ textAlign: 'initial' }}>{label}:</FormLabel>
      <Box sx={{ textAlign: 'initial' }}>
        {data?.map((component) => {
          const componentsExcludableComponentsFilteredOut =
            component?.recipe?.excludable?.filter((c) => c.isFilteredOut)
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
              <Box
                sx={{
                  borderRadius: 50,
                  margin: '2px',
                  display: 'flex',
                  backgroundColor: 'white',
                  padding: '4px 8px',
                }}
              >
                <Typography
                  sx={{
                    textDecoration:
                      component.isMainComponentFilteredOut ||
                      component.isFilteredOut
                        ? 'line-through'
                        : 'none',
                  }}
                >
                  {getComponentLabel(component).toLocaleLowerCase()}
                </Typography>

                {component.price > 0 && (
                  <>
                    <Divider
                      orientation="vertical"
                      variant="middle"
                      flexItem
                      sx={{ margin: `0 ${theme.spacing(1)}` }}
                    />

                    <Typography>
                      {component.price > 0
                        ? `(+${component.price}${kitchen?.currency})`
                        : ''}
                    </Typography>
                  </>
                )}
              </Box>
            </Badge>
          )
        })}
      </Box>
    </Stack>
  )
}
