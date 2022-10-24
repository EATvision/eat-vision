import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Alert, AlertTitle, Box, Card, CardActions, CardContent, CardHeader,
  CardMedia, Collapse, Divider, IconButton, List, ListItem, Paper, Typography, useTheme,
} from '@mui/material'
import { CgPlayListAdd as DescriptionIcon, CgMathPercent as KcalIcon } from 'react-icons/cg'
import { BiMessageMinus as ChangesIcon, BiMessageAdd as UpgradesIcon } from 'react-icons/bi'
import { VscVersions as SizesIcon } from 'react-icons/vsc'
import { BsBasket as IngredientsIcon } from 'react-icons/bs'
import { TiWarningOutline as WarningsIcon } from 'react-icons/ti'

import ClampLines from 'react-clamp-lines'

import { t } from 'i18next'
import { useKitchenById } from '../../../hooks/kitchens'

import DishRecipeTypeChips from './DishRecipeTypeChips'
import DishAccordion from './DishAccordion'
import WaiterBanner from '../WaiterBanner'

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
                  <ListItem dense key={component.id}>{component.name}</ListItem>
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
                {data.recipe.choice.map((c) => c.name).join(', ')}
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
          </Box>
        </Box>

        <Box>
          {
            data.recipe?.choice?.length > 0
            && (
            <DishRecipeTypeChips
              data={data}
              label="choice"
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
              label="side dish"
              recipeType="sideDish"
              selectedComponents={selectedComponents.sideDish}
              onSelect={handleSelect('sideDish', { exclusive: false })}
            />
            )
          }

          <DishAccordion data={data} />
        </Box>

        {
          dishExcludableComponentsFilteredOut?.length > 0
          && (
            <WaiterBanner
              title={t('my_reccomendations_for_you')}
              subtitle={(
                <List dense disablePadding>
                  {
                    dishExcludableComponentsFilteredOut.map((component) => (
                      <ListItem
                        key={component.id}
                        disableGutters
                        disablePadding
                        dense
                      >
                        {`${t('ask_without_the')} ${component.name}`}
                      </ListItem>
                    ))
                    }
                </List>
              )}
            />
          )
        }

        <CardActions>
          <IconButton
            onClick={handleClickMoreInfoBtn('Description')}
          >
            <DescriptionIcon />
          </IconButton>
          <IconButton
            onClick={handleClickMoreInfoBtn('Changes')}
          >
            <ChangesIcon />
          </IconButton>
          <IconButton
            onClick={handleClickMoreInfoBtn('Kcal')}
          >
            <KcalIcon />
          </IconButton>
          <IconButton
            onClick={handleClickMoreInfoBtn('Upgrades')}
          >
            <UpgradesIcon />
          </IconButton>
          <IconButton
            onClick={handleClickMoreInfoBtn('Sizes')}
          >
            <SizesIcon />
          </IconButton>
          <IconButton
            onClick={handleClickMoreInfoBtn('Ingredients')}
          >
            <IngredientsIcon />
          </IconButton>
          <IconButton
            onClick={handleClickMoreInfoBtn('Warnings')}
          >
            <WarningsIcon />
          </IconButton>
        </CardActions>

        <Divider />
        <Collapse in={Boolean(expandedMoreInfo)} timeout="auto" unmountOnExit>
          <CardContent>
            {expandedMoreInfo}
          </CardContent>
        </Collapse>
      </Card>
    </Paper>
  )
}
