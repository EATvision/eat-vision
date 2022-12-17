import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  Divider,
  Grow,
  Paper,
  Typography,
  useTheme,
} from '@mui/material'

import ClampLines from 'react-clamp-lines'
import { t } from 'i18next'
import { useV1KitchenById } from 'hooks/kitchens'

import DishRecipeTypeChips from './DishRecipeTypeChips'
import AskForChangesBtn from './AskForChangesBtn'
import DishExtraInfo from './DishExtraInfo'

export default function FoodDish({ data }) {
  const theme = useTheme()
  const { kitchenId } = useParams()
  const { kitchen } = useV1KitchenById(kitchenId)

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
    <Grow in>
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
          <Box>
            <CardHeader
              sx={{
                textAlign: 'initial',
                flex: 1,
                alignItems: 'flex-start',
                paddingBottom: 0,
              }}
              title={
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <Typography variant="h6">{data.name}</Typography>

                  {data.price && (
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
            />

            <Box sx={{ display: 'flex' }}>
              <Box
                sx={{
                  flex: 1,
                  textAlign: 'start',
                  padding: theme.spacing(2),
                  paddingTop: 0,
                }}
              >
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
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                }}
              >
                {data?.image?.url && (
                  <CardMedia
                    component="img"
                    sx={{
                      width: 110,
                      height: 110,
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
          </Box>

          <Box sx={{ marginTop: theme.spacing(1) }}>
            {data.recipe?.choice?.length > 0 && (
              <>
                <Typography
                  sx={{ textAlign: 'start', margin: `0 ${theme.spacing(1)}` }}
                >
                  {t('choice')}:
                </Typography>
                {data.recipe?.choice.map((choices, index) => (
                  <DishRecipeTypeChips
                    key={index}
                    data={choices}
                    selectedComponents={selectedComponents.choice}
                    onSelect={handleSelect('choice', { exclusive: true })}
                  />
                ))}
              </>
            )}

            {data.recipe?.sideDish?.length > 0 && (
              <>
                <Typography
                  sx={{ textAlign: 'start', margin: `0 ${theme.spacing(1)}` }}
                >
                  {t('sidedish')}:
                </Typography>
                <DishRecipeTypeChips
                  data={data.recipe.sideDish}
                  selectedComponents={selectedComponents.sideDish}
                  onSelect={handleSelect('sideDish', { exclusive: false })}
                />
              </>
            )}

            {data.recipe?.addableComponents?.length > 0 && (
              <>
                <Typography
                  sx={{ textAlign: 'start', margin: `0 ${theme.spacing(1)}` }}
                >
                  {t('addableComponents')}:
                </Typography>
                <DishRecipeTypeChips
                  data={data.recipe.addableComponents}
                  selectedComponents={selectedComponents.addableComponents}
                  onSelect={handleSelect('addableComponents', {
                    exclusive: false,
                  })}
                />
              </>
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
              {data.sizes.map((size, index) => (
                <Box
                  key={`${data.id}-${size.type}-${index}`}
                  sx={{
                    borderRadius: 50,
                    margin: `0 ${theme.spacing(1)}`,
                    display: 'flex',
                    backgroundColor: 'white',
                    padding: '4px 8px',
                  }}
                >
                  <Typography sx={{ margin: 0 }}>
                    {t(`size_type_${size.type}`)}
                  </Typography>

                  <Divider
                    orientation="vertical"
                    variant="middle"
                    flexItem
                    sx={{ margin: `0 ${theme.spacing(1)}` }}
                  />

                  <Typography sx={{ margin: 0 }}>{`${kitchen.currency}${
                    Number(size.price) || Number(data.price)
                  }`}</Typography>
                </Box>
              ))}
            </Box>
          )}

          <DishExtraInfo data={data} />
        </Card>
      </Paper>
    </Grow>
  )
}
