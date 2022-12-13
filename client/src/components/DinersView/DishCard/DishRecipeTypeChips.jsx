import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  useTheme,
  FormLabel,
  Badge,
  Typography,
  styled,
} from '@mui/material'

import { useKitchenById } from 'hooks/kitchens'
import { useGetComponentLabel } from 'hooks/ingredients/ingredients'

const LTRTypography = styled(Typography)`
  /* @noflip */
  direction: ltr;
`

export default function DishRecipeChips({ data, label }) {
  const theme = useTheme()
  const { kitchenId } = useParams()
  const { kitchen } = useKitchenById(kitchenId)

  const getComponentLabel = useGetComponentLabel()
  return (
    <Box
      spacing={1}
      sx={{
        backgroundColor: theme.palette.grey[200],
        padding: theme.spacing(1),
        alignItems: 'center',
        marginBottom: '4px',
      }}
    >
      {label && <FormLabel sx={{ textAlign: 'initial' }}>{label}:</FormLabel>}
      <Box sx={{ textAlign: 'initial' }}>
        {data?.map((component, index) => {
          return (
            <Badge
              variant="dot"
              color="error"
              key={component.id}
              invisible
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{ alignItems: 'center', marginRight: theme.spacing(1) }}
            >
              <Box
                sx={{
                  borderRadius: 50,
                  display: 'flex',
                  marginRight: theme.spacing(1),
                  textDecoration:
                    component.isMainDishFilteredOut || component.isFilteredOut
                      ? 'line-through'
                      : 'none',
                }}
              >
                <Typography>
                  {getComponentLabel(component)?.toLocaleLowerCase()}
                </Typography>

                {component.price > 0 && (
                  <LTRTypography sx={{ marginLeft: theme.spacing(1) }}>
                    {component.price > 0
                      ? `(+${component.price}${kitchen?.currency})`
                      : ''}
                  </LTRTypography>
                )}
              </Box>
              {index !== data.length - 1 && <Typography>/</Typography>}
            </Badge>
          )
        })}
      </Box>
    </Box>
  )
}
