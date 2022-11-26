import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  Divider,
  Paper,
  Typography,
  useTheme,
} from '@mui/material'

import ClampLines from 'react-clamp-lines'

import { t } from 'i18next'
import { useKitchenById } from 'hooks/kitchens'

import DishRecipeTypeChips from './DishRecipeTypeChips'
import AskForChangesBtn from './AskForChangesBtn'

export default function DrinkDish({ data }) {
  const theme = useTheme()
  const { kitchenId } = useParams()
  const { kitchen } = useKitchenById(kitchenId)

  const [selectedComponents, setSelectedComponents] = React.useState({
    choice: [],
    sideDish: [],
    addableComponents: [],
  })

  const dishExcludableComponentsFilteredOut = data?.recipe?.excludable?.filter(
    (component) => component.isFilteredOut
  )

  const handleSelect =
    (recipeType, options = { exclusive: false }) =>
      (componentId) => {
        setSelectedComponents((currSelectedComponents) => ({
          ...currSelectedComponents,
          // eslint-disable-next-line no-nested-ternary
          [recipeType]: currSelectedComponents[recipeType].includes(componentId)
            ? options.exclusive
              ? [componentId]
              : currSelectedComponents[recipeType].filter(
                (c) => c !== componentId
              )
            : [...currSelectedComponents[recipeType], componentId],
        }))
      }

  return (
    <Paper
      elevation={5}
      sx={{
        width: '100%',
        maxWidth: 750,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        marginBottom: theme.spacing(2),
        flex: 1,
      }}
    >
      <Card
        sx={{
          width: '100%',
          opacity: data.isMainDishFilteredOut ? 0.2 : 1,
          pointerEvents: data.isMainDishFilteredOut ? 'none' : 'all',
        }}
        elevation={0}
      >
        <Box sx={{ display: 'flex' }}>
          <CardHeader
            sx={{ textAlign: 'initial', flex: 1, alignItems: 'flex-start' }}
            title={
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {data.name}
                </Typography>

                {data.price && !data.sizes?.length && (
                  <Typography
                    variant="h6"
                    sx={{
                      marginLeft: theme.spacing(1),
                    }}
                  >
                    {`${data.price}${kitchen?.currency}`}
                  </Typography>
                )}
              </Box>
            }
            subheader={
              <ClampLines
                text={data.description || ''}
                id={data.id}
                lines={10}
                ellipsis="..."
                moreText="Expand"
                lessText="Collapse"
                className="custom-class"
                innerElement="p"
              />
            }
          />

          <Box>
            {data?.image?.url && (
              <CardMedia
                component="img"
                sx={{
                  width: 100,
                  maxHeight: 100,
                  margin: theme.spacing(1),
                }}
                image={data?.image?.url}
                alt=""
              />
            )}
            {dishExcludableComponentsFilteredOut?.length > 0 && (
              <AskForChangesBtn
                dishExcludableComponentsFilteredOut={
                  dishExcludableComponentsFilteredOut
                }
              />
            )}
          </Box>
        </Box>

        <Box>
          {data.recipe?.choice?.length > 0 &&
            data.recipe?.choice.map((choices, index) => (
              <DishRecipeTypeChips
                key={index}
                data={choices}
                label={t('choice')}
                selectedComponents={selectedComponents.choice}
                onSelect={handleSelect('choice', { exclusive: true })}
              />
            ))}

          {data.recipe?.sideDish?.length > 0 && (
            <DishRecipeTypeChips
              data={data.recipe.sideDish}
              label={t('sidedish')}
              selectedComponents={selectedComponents.sideDish}
              onSelect={handleSelect('sideDish', { exclusive: false })}
            />
          )}
        </Box>

        {data?.sizes?.length > 0 && (
          <Box
            sx={{
              backgroundColor: theme.palette.grey[200],
              padding: theme.spacing(1),
              alignItems: 'center',
              marginBottom: theme.spacing(1),
              display: 'flex',
            }}
          >
            {data.sizes.map((size) => (
              <Box
                key={size.type}
                sx={{
                  borderRadius: 50,
                  margin: `0 ${theme.spacing(1)}`,
                  display: 'flex',
                  backgroundColor: 'white',
                  padding: theme.spacing(1),
                }}
              >
                <Typography>{t(`size_type_${size.type}`)}</Typography>

                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  sx={{ margin: `0 ${theme.spacing(2)}` }}
                />

                <Typography>{`${kitchen.currency}${
                  (Number(size.price) || 0) + Number(data.price)
                }`}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Card>
    </Paper>
  )
}
