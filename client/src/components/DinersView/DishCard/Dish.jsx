import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Alert, AlertTitle, Box, Card, CardActions, CardContent, CardHeader,
  CardMedia, Collapse, Divider, IconButton, List, ListItem, Paper, Typography, useTheme,
} from '@mui/material'
import { CgPlayListAdd as DescriptionIcon, CgMathPercent as NutritionIcon } from 'react-icons/cg'
import { BiMessageMinus as ChangesIcon, BiMessageAdd as UpgradesIcon } from 'react-icons/bi'
import { VscVersions as SizesIcon } from 'react-icons/vsc'
import { BsBasket as IngredientsIcon } from 'react-icons/bs'
import { TiWarningOutline as WarningsIcon } from 'react-icons/ti'

import ClampLines from 'react-clamp-lines'

import { t } from 'i18next'
import { useKitchenById } from '../../../hooks/kitchens'

import DishRecipeTypeChips from './DishRecipeTypeChips'
import AskForChangesBtn from './AskForChangesBtn'
import ChangesInfo from './ChangesInfo'
import DescriptionInfo from './DescriptionInfo'
import IngredientsInfo from './IngredientsInfo'
import { useGetComponentLabel } from '../../../hooks/ingredients'

export default function Dish({ data }) {
  const theme = useTheme()
  const { kitchenId } = useParams()
  const { kitchen } = useKitchenById(kitchenId)

  const [expandedMoreInfo, setExpandedMoreInfo] = React.useState()
  const [selectedComponents, setSelectedComponents] = React.useState({ choice: [], sideDish: [], addableComponents: [] })

  const dishExcludableComponentsFilteredOut = data?.recipe?.excludable?.filter(
    (component) => component.isFilteredOut,
  )

  const mandatoryComponentsFilteredOut = data?.recipe?.mandatory?.filter(
    (component) => component.isFilteredOut,
  )

  const handleSelect = (recipeType, options = { exclusive: false }) => (componentId) => {
    setSelectedComponents((currSelectedComponents) => ({
      ...currSelectedComponents,
      // eslint-disable-next-line no-nested-ternary
      [recipeType]: currSelectedComponents[recipeType].includes(componentId) ? (
        options.exclusive ? [componentId] : currSelectedComponents[recipeType].filter((c) => c !== componentId)
      ) : [...currSelectedComponents[recipeType], componentId],
    }))
  }

  const handleClickMoreInfoBtn = (moreInfoTab) => () => {
    if (expandedMoreInfo !== moreInfoTab) {
      setExpandedMoreInfo(moreInfoTab)
    } else {
      setExpandedMoreInfo()
    }
  }

  const getComponentLabel = useGetComponentLabel()

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

      {
        data.isMainDishFilteredOut
        && (
        <Alert
          severity="error"
          sx={{
            position: 'absolute',
            top: '50%',
            transform: 'translate(0, -50%)',
          }}
        >
          <AlertTitle>FILTERED OUT</AlertTitle>
          {
            mandatoryComponentsFilteredOut.length > 0
            && (
            <List dense>
              {
                mandatoryComponentsFilteredOut.map((component) => (
                  <ListItem dense key={component.id}>{getComponentLabel(component)}</ListItem>
                ))
              }
            </List>
            )
          }

          {
            mandatoryComponentsFilteredOut.length === 0
            && (
              <Typography>
                All choice ingredients were filtered out (
                {data.recipe.choice.map((c) => getComponentLabel(c)).join(', ')}
                )
              </Typography>
            )
          }
        </Alert>
        )
      }

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
            title={(
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {data.name}
                </Typography>

                {
                  data.price
                  && (
                  <Typography
                    variant="h6"
                    sx={{
                      marginLeft: theme.spacing(1),
                    }}
                  >
                    {`${data.price}${kitchen?.currency}`}
                  </Typography>
                  )
                }
              </Box>
             )}
            subheader={(
              <ClampLines
                text={data.description || ''}
                id={data.id}
                lines={2}
                ellipsis="..."
                moreText="Expand"
                lessText="Collapse"
                className="custom-class"
                innerElement="p"
              />
            )}
          />

          <Box>
            {
              data?.image?.url
              && (
                <CardMedia
                  component="img"
                  sx={{
                    width: 100, maxHeight: 100, margin: theme.spacing(1),
                  }}
                  image={data?.image?.url}
                  alt=""
                />
              )
            }
            {
              dishExcludableComponentsFilteredOut?.length > 0
              && <AskForChangesBtn dishExcludableComponentsFilteredOut={dishExcludableComponentsFilteredOut} />
            }
          </Box>
        </Box>

        <Box>
          {
            data.recipe?.choice?.length > 0
            && (
            <DishRecipeTypeChips
              data={data}
              label={t('choice')}
              recipeType="choice"
              selectedComponents={selectedComponents.choice}
              onSelect={handleSelect('choice', { exclusive: true })}
            />
            )
          }

          {
            data.recipe?.sideDish?.length > 0
            && (
            <DishRecipeTypeChips
              data={data}
              label={t('sidedish')}
              recipeType="sideDish"
              selectedComponents={selectedComponents.sideDish}
              onSelect={handleSelect('sideDish', { exclusive: false })}
            />
            )
          }
        </Box>

        {
            (
              data.longDescription
              || (data.recipe.putaside.length > 0 || data.recipe.excludable.length > 0)
              || data.recipe.nutrition
              || data.recipe.updates
              || data.sizes
              || data.recipe.mandatory.length > 0
              || data.warnings
            )
              && (
              <>
                <Typography sx={{
                  fontSize: '0.8rem',
                  width: '100%',
                  textAlign: 'start',
                  margin: `0 ${theme.spacing(2)}`,
                }}
                >
                  {t('more_info')}
                </Typography>
                <Divider />
              </>
              )
          }
        <CardActions>
          {
            data.longDescription
            && (
            <IconButton
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}
              color={expandedMoreInfo === 'description' ? 'primary' : 'default'}
              onClick={handleClickMoreInfoBtn('description')}
            >
              <DescriptionIcon />
              <Typography sx={{ fontSize: 12 }}>{t('description')}</Typography>
            </IconButton>
            )
          }

          {
            (data.recipe.putaside.length > 0 || data.recipe.excludable.length > 0)
            && (
            <IconButton
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}
              color={expandedMoreInfo === 'changes' ? 'primary' : 'default'}
              onClick={handleClickMoreInfoBtn('changes')}
            >
              <ChangesIcon />
              <Typography sx={{ fontSize: 12 }}>{t('changes')}</Typography>
            </IconButton>
            )
          }

          {
            data.recipe.nutrition
            && (
            <IconButton
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}
              color={expandedMoreInfo === 'nutrition' ? 'primary' : 'default'}
              onClick={handleClickMoreInfoBtn('nutrition')}
            >
              <NutritionIcon />
              <Typography sx={{ fontSize: 12 }}>{t('nutrition')}</Typography>
            </IconButton>
            )
          }

          {
            data.recipe.updates
            && (
            <IconButton
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}
              color={expandedMoreInfo === 'upgrades' ? 'primary' : 'default'}
              onClick={handleClickMoreInfoBtn('upgrades')}
            >
              <UpgradesIcon />
              <Typography sx={{ fontSize: 12 }}>{t('upgrades')}</Typography>
            </IconButton>
            )
          }

          {
            data.sizes
            && (
            <IconButton
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}
              color={expandedMoreInfo === 'sizes' ? 'primary' : 'default'}
              onClick={handleClickMoreInfoBtn('sizes')}
            >
              <SizesIcon />
              <Typography sx={{ fontSize: 12 }}>{t('sizes')}</Typography>
            </IconButton>
            )
          }

          {
            data.recipe.mandatory.length > 0
            && (
            <IconButton
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}
              color={expandedMoreInfo === 'ingredients' ? 'primary' : 'default'}
              onClick={handleClickMoreInfoBtn('ingredients')}
            >
              <IngredientsIcon />
              <Typography sx={{ fontSize: 12 }}>{t('ingredients')}</Typography>
            </IconButton>
            )
          }

          {
            data.warnings
            && (
            <IconButton
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}
              color={expandedMoreInfo === 'warnings' ? 'primary' : 'default'}
              onClick={handleClickMoreInfoBtn('warnings')}
            >
              <WarningsIcon />
              <Typography sx={{ fontSize: 12 }}>{t('warnings')}</Typography>
            </IconButton>
            )
          }
        </CardActions>

        <Divider />
        <Collapse in={Boolean(expandedMoreInfo)} timeout="auto" unmountOnExit>
          <CardContent sx={{ textAlign: 'start' }}>
            <ExpandedInfo type={expandedMoreInfo} data={data} />
          </CardContent>
        </Collapse>
      </Card>
    </Paper>
  )
}

function ExpandedInfo({ type, data }) {
  switch (type) {
    case 'description':
      return <DescriptionInfo data={data} />
    case 'changes': {
      return <ChangesInfo data={data} />
    }
    case 'ingredients': {
      return <IngredientsInfo data={data} />
    }

    default:
      return null
  }
}
