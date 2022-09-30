import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Alert, AlertTitle, Badge, Box, Button, Card, CardHeader,
  CardMedia, Divider, List, ListItem, Paper, Popover, Typography, useTheme,
} from '@mui/material'

import ClampLines from 'react-clamp-lines'

import { useKitchenById } from '../../hooks/kitchens'

import DishRecipeTypeChips from './DishRecipeTypeChips'

export default function Dish({ data }) {
  const theme = useTheme()
  const { kitchenId } = useParams()
  const { kitchen } = useKitchenById(kitchenId)

  const [askForChangesAnchorEl, setAskForChangesAnchorEl] = React.useState(null)

  const dishExcludableComponentsFilteredOut = data?.recipe?.excludable?.filter(
    (component) => component.isFilteredOut,
  )

  const mandatoryComponentsFilteredOut = data?.recipe?.mandatory?.filter(
    (component) => component.isFilteredOut,
  )

  const handlePopoverOpen = (event) => {
    setAskForChangesAnchorEl(event.currentTarget)
  }

  const handlePopoverClose = () => {
    setAskForChangesAnchorEl(null)
  }

  return (
    <Paper
      elevation={2}
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
                    {`${data.price}${kitchen.currency}`}
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
                ? (
                  <CardMedia
                    component="img"
                    sx={{
                      width: 163, height: 163, maxHeight: 163, borderRadius: '10px', margin: theme.spacing(1),
                    }}
                    image={data?.image?.url}
                    alt=""
                  />
                )
                : (
                  <Box sx={{
                    width: 163, height: 163, maxHeight: 163, borderRadius: '10px', margin: theme.spacing(1), backgroundColor: '#eeeeee',
                  }}
                  />
                )
            }

            {
              dishExcludableComponentsFilteredOut?.length > 0
              && (
                <Box
                  sx={{ marginBottom: theme.spacing(1), marginTop: theme.spacing(1) }}
                >
                  <Badge
                    color="error"
                    badgeContent={dishExcludableComponentsFilteredOut.length}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ maxWidth: 163, borderRadius: 163 }}
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                    >
                      ASK FOR CHANGES
                    </Button>
                  </Badge>
                  <Popover
                    id="mouse-over-popover"
                    sx={{
                      pointerEvents: 'none',
                    }}
                    open={Boolean(askForChangesAnchorEl)}
                    anchorEl={askForChangesAnchorEl}
                    onClose={handlePopoverClose}
                    disableRestoreFocus
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'center',
                    }}
                    transformOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                  >
                    <Alert severity="warning">
                      <AlertTitle>ASK TO EXCLUDE</AlertTitle>
                      <List dense>
                        {
                          dishExcludableComponentsFilteredOut.map((component) => (
                            <ListItem key={component.id}>{component.name}</ListItem>
                          ))
                        }
                      </List>
                    </Alert>
                  </Popover>
                </Box>
              )
            }
          </Box>
        </Box>

        <Box sx={{
          padding: theme.spacing(1),
        }}
        >
          {
            data.recipe?.choice?.length > 0
            && (
              <DishRecipeTypeChips data={data} label="choice" recipeType="choice" />
            )
          }

          {
            data.recipe?.sideDish?.length > 0
            && (
              <DishRecipeTypeChips data={data} label="side dish" recipeType="sideDish" />
            )
          }

          {
            data.recipe?.addableComponents?.length > 0
            && (
            <DishRecipeTypeChips data={data} label="upgrades" recipeType="addableComponents" />
            )
          }
        </Box>
      </Card>

      <Divider sx={{ width: '100%' }} />
    </Paper>
  )
}
