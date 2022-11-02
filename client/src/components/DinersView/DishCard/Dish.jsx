import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, CardHeader,
  CardMedia, Collapse, Divider, IconButton, List, ListItem, Paper, Table,
  TableBody, TableCell, TableHead, TableRow, Typography, useTheme,
} from '@mui/material'
import { CgPlayListAdd as DescriptionIcon, CgMathPercent as KcalIcon } from 'react-icons/cg'
import { BiMessageMinus as ChangesIcon, BiMessageAdd as UpgradesIcon } from 'react-icons/bi'
import { VscVersions as SizesIcon } from 'react-icons/vsc'
import { BsBasket as IngredientsIcon } from 'react-icons/bs'
import { TiWarningOutline as WarningsIcon } from 'react-icons/ti'
import CheckIcon from '@mui/icons-material/Check'

import ClampLines from 'react-clamp-lines'

import { t } from 'i18next'
import { useKitchenById } from '../../../hooks/kitchens'

import DishRecipeTypeChips from './DishRecipeTypeChips'
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
    <>
      {
        dishExcludableComponentsFilteredOut?.length > 0
        && (
        <Button variant="contained" color="secondary">
          {t('ask_for_changes')}
        </Button>
        )
      }
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
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2px', minWidth: 35,
              }}
              disabled={!data.longDescription}
              color={expandedMoreInfo === 'description' ? 'primary' : 'default'}
              onClick={handleClickMoreInfoBtn('description')}
            >
              <DescriptionIcon />
              <Typography sx={{ fontSize: 12 }}>desc</Typography>
            </IconButton>

            <IconButton
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2px', minWidth: 35,
              }}
              disabled={data.recipe.putaside.length === 0 || data.recipe.excludable.length === 0}
              color={expandedMoreInfo === 'changes' ? 'primary' : 'default'}
              onClick={handleClickMoreInfoBtn('changes')}
            >
              <ChangesIcon />
              <Typography sx={{ fontSize: 12 }}>changes</Typography>
            </IconButton>
            <IconButton
              disabled
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2px', minWidth: 35,
              }}
              color={expandedMoreInfo === 'kcal' ? 'primary' : 'default'}
              onClick={handleClickMoreInfoBtn('kcal')}
            >
              <KcalIcon />
              <Typography sx={{ fontSize: 12 }}>kcal</Typography>
            </IconButton>
            <IconButton
              disabled
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2px', minWidth: 35,
              }}
              color={expandedMoreInfo === 'upgrades' ? 'primary' : 'default'}
              onClick={handleClickMoreInfoBtn('upgrades')}
            >
              <UpgradesIcon />
              <Typography sx={{ fontSize: 12 }}>upgrades</Typography>
            </IconButton>
            <IconButton
              disabled
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2px', minWidth: 35,
              }}
              color={expandedMoreInfo === 'sizes' ? 'primary' : 'default'}
              onClick={handleClickMoreInfoBtn('sizes')}
            >
              <SizesIcon />
              <Typography sx={{ fontSize: 12 }}>sizes</Typography>
            </IconButton>
            <IconButton
              disabled
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2px', minWidth: 35,
              }}
              color={expandedMoreInfo === 'ingredients' ? 'primary' : 'default'}
              onClick={handleClickMoreInfoBtn('ingredients')}
            >
              <IngredientsIcon />
              <Typography sx={{ fontSize: 12 }}>ing</Typography>
            </IconButton>
            <IconButton
              disabled
              sx={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2px', minWidth: 35,
              }}
              color={expandedMoreInfo === 'warnings' ? 'primary' : 'default'}
              onClick={handleClickMoreInfoBtn('warnings')}
            >
              <WarningsIcon />
              <Typography sx={{ fontSize: 12 }}>warnings</Typography>
            </IconButton>
          </CardActions>

          <Divider />
          <Collapse in={Boolean(expandedMoreInfo)} timeout="auto" unmountOnExit>
            <CardContent sx={{ textAlign: 'start' }}>
              <ExpandedInfo type={expandedMoreInfo} data={data} />
            </CardContent>
          </Collapse>
        </Card>
      </Paper>
    </>
  )
}

function ExpandedInfo({ type, data }) {
  const theme = useTheme()

  switch (type) {
    case 'description':
      return (
        <>
          <Typography sx={{ fontWeight: 'bold', marginBottom: theme.spacing(2) }}>Description</Typography>
          <Typography>{data.longDescription}</Typography>
        </>
      )
    case 'changes': {
      const ingredientsSummary = {}
      data.recipe.putaside.forEach((component) => {
        ingredientsSummary[component.id] = { ...(ingredientsSummary[component.id] || {}), putaside: true }
      })
      data.recipe.excludable.forEach((component) => {
        ingredientsSummary[component.id] = { ...(ingredientsSummary[component.id] || {}), excludable: true }
      })
      return (
        <>
          <Typography sx={{ fontWeight: 'bold', marginBottom: theme.spacing(2) }}>Dish Possible Changes</Typography>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>ingredient</TableCell>
                <TableCell>remove</TableCell>
                <TableCell>put aside</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.entries(ingredientsSummary).map((row) => (
                <TableRow
                  key={row[0]}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row[0]}
                  </TableCell>
                  <TableCell>{row[1].excludable && <CheckIcon />}</TableCell>
                  <TableCell>{row[1].putaside && <CheckIcon />}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      )
    }

    default:
      return null
  }
}
