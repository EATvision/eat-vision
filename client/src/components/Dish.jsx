import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert, AlertTitle, Box, Card, CardContent, CardHeader,
  CardMedia, Divider, List, ListItem, Typography, useTheme,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import ClampLines from 'react-clamp-lines'

import { useKitchenById } from '../hooks/kitchens'

export default function Dish({ data }) {
  const theme = useTheme()
  const { kitchenId } = useParams()
  const { kitchen } = useKitchenById(kitchenId)

  const dishExcludableComponentsFilteredOut = data?.recipe?.excludable?.filter(
    (component) => component.isFilteredOut,
  )

  const mandatoryComponentsFilteredOut = data?.recipe?.mandatory?.filter(
    (component) => component.isFilteredOut,
  )

  return (
    <Box sx={{
      maxWidth: 750,
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
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
            sx={{ textAlign: 'initial', flex: 1 }}
            title={(
              <Typography variant="h6" gutterBottom>
                {data.name}
              </Typography>
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
            action={data.price && (
              <div>
                {`${data.price}${kitchen.currency}`}
              </div>
            )}
          />

          {
            data?.image?.url
              ? (
                <CardMedia
                  component="img"
                  sx={{
                    width: 120, height: 120, maxHeight: 120, borderRadius: '10px', margin: '10px',
                  }}
                  image={data?.image?.url}
                  alt=""
                />
              )
              : (
                <Box sx={{
                  width: 120, height: 120, maxHeight: 120, borderRadius: '10px', margin: '10px', backgroundColor: '#eeeeee',
                }}
                />
              )
          }
        </Box>

        {
          dishExcludableComponentsFilteredOut?.length > 0
          && (
          <CardContent>

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
          </CardContent>
          )
        }

        {
          data.recipe?.choice?.length > 0
          && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Choice in dishes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {
              data.recipe.choice.map((component) => (
                <Box
                  key={`choice-${component.id}`}
                  sx={{
                    maxWidth: 750,
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    position: 'relative',
                    backgroundColor: '#cfcfcf',
                  }}
                >
                  {
                    component.isFilteredOut
                    && (
                      <Alert
                        severity="error"
                        sx={{
                          position: 'absolute',
                          right: theme.spacing(1),
                          top: '50%',
                          transform: 'translate(0, -50%)',
                        }}
                      >
                        <AlertTitle>FILTERED OUT</AlertTitle>
                      </Alert>
                    )
                  }
                  <Card sx={{ width: '100%', backgroundColor: '#f1f1f1', opacity: component.isFilteredOut ? 0.2 : 1 }} elevation={0}>
                    <Box sx={{ display: 'flex' }}>
                      <CardHeader
                        sx={{ textAlign: 'initial', flex: 1 }}
                        title={(
                          <Typography variant="h7">
                            {component.name}
                          </Typography>
                        )}
                        subheader={(
                          <ClampLines
                            text={component.description || ''}
                            id={component.id}
                            lines={2}
                            ellipsis="..."
                            moreText="Expand"
                            lessText="Collapse"
                            className="custom-class"
                            innerElement="p"
                          />
                        )}
                        action={component.price > 0 && (
                          <div>
                            {`+${component.price}${kitchen.currency}`}
                          </div>
                        )}
                      />
                    </Box>
                  </Card>

                  <Divider sx={{ width: '100%' }} />
                </Box>
              ))
            }
            </AccordionDetails>
          </Accordion>
          )
        }

        {
          data.recipe?.sideDish?.length > 0
          && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Side dishes</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {
              data.recipe.sideDish.map((dish) => {
                const sideDishExcludableComponentsFilteredOut = dish?.recipe?.excludable?.filter(
                  (component) => component.isFilteredOut,
                )

                return (
                  <Box
                    key={`sideDish-${dish.id}`}
                    sx={{
                      maxWidth: 750,
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      position: 'relative',
                      backgroundColor: '#cfcfcf',
                    }}
                  >
                    {
                    dish.isMainDishFilteredOut
                    && (
                      <Alert
                        severity="error"
                        sx={{
                          position: 'absolute',
                          right: theme.spacing(1),
                          top: '50%',
                          transform: 'translate(0, -50%)',
                        }}
                      >
                        <AlertTitle>FILTERED OUT</AlertTitle>
                        {
                          sideDishExcludableComponentsFilteredOut.length > 0
                          && (
                            <List dense>
                              {
                                sideDishExcludableComponentsFilteredOut.map((component) => (
                                  <ListItem dense key={component.id}>{component.name}</ListItem>
                                ))
                              }
                            </List>
                          )
                        }
                      </Alert>
                    )
                  }
                    <Card sx={{ width: '100%', backgroundColor: '#f1f1f1', opacity: dish.isMainDishFilteredOut ? 0.2 : 1 }} elevation={0}>
                      <Box sx={{ display: 'flex' }}>
                        <CardHeader
                          sx={{ textAlign: 'initial', flex: 1 }}
                          title={(
                            <Typography variant="h7">
                              {dish.name}
                            </Typography>
                        )}
                          subheader={(
                            <ClampLines
                              text={dish.description || ''}
                              id={dish.id}
                              lines={2}
                              ellipsis="..."
                              moreText="Expand"
                              lessText="Collapse"
                              className="custom-class"
                              innerElement="p"
                            />
                        )}
                          action={dish.price > 0 && (
                          <div>
                            {`+${dish.price}${kitchen.currency}`}
                          </div>
                          )}
                        />
                      </Box>

                      {
                        sideDishExcludableComponentsFilteredOut?.length > 0
                        && (
                        <CardContent>
                          <Alert severity="warning">
                            <AlertTitle>ASK TO EXCLUDE</AlertTitle>
                            <List dense>
                              {
                                sideDishExcludableComponentsFilteredOut.map((component) => (
                                  <ListItem dense key={component.id}>{component.name}</ListItem>
                                ))
                              }
                            </List>
                          </Alert>
                        </CardContent>
                        )
                      }
                    </Card>

                    <Divider sx={{ width: '100%' }} />
                  </Box>
                )
              })
            }
            </AccordionDetails>
          </Accordion>
          )
        }

        {
          data.recipe.addableComponents.length > 0
          && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
            >
              <Typography>Upgrage dish</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {
              data.recipe.addableComponents.map((dish) => {
                const addableComponentExcludableComponentsFilteredOut = dish?.recipe?.excludable?.filter(
                  (component) => component.isFilteredOut,
                )
                return (
                  <Box
                    key={`addableComponent-${dish.id}`}
                    sx={{
                      maxWidth: 750,
                      width: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      position: 'relative',
                      backgroundColor: '#cfcfcf',
                    }}
                  >
                    {
                    dish.isMainDishFilteredOut
                    && (
                      <Alert
                        severity="error"
                        sx={{
                          position: 'absolute',
                          right: theme.spacing(1),
                          top: '50%',
                          transform: 'translate(0, -50%)',
                        }}
                      >
                        <AlertTitle>FILTERED OUT</AlertTitle>
                        {
                          addableComponentExcludableComponentsFilteredOut.length > 0
                          && (
                          <List dense>
                            {
                              addableComponentExcludableComponentsFilteredOut.map((component) => (
                                <ListItem dense key={component.id}>{component.name}</ListItem>
                              ))
                            }
                          </List>
                          )
                        }
                      </Alert>
                    )
                  }
                    <Card sx={{ width: '100%', backgroundColor: '#f1f1f1', opacity: dish.isMainDishFilteredOut ? 0.2 : 1 }} elevation={0}>
                      <Box sx={{ display: 'flex' }}>
                        <CardHeader
                          sx={{ textAlign: 'initial', flex: 1 }}
                          title={(
                            <Typography variant="h7">
                              {dish.name}
                            </Typography>
                        )}
                          subheader={(
                            <ClampLines
                              text={dish.description || ''}
                              id={dish.id}
                              lines={2}
                              ellipsis="..."
                              moreText="Expand"
                              lessText="Collapse"
                              className="custom-class"
                              innerElement="p"
                            />
                        )}
                          action={dish.price > 0 && (
                          <div>
                            {`+${dish.price}${kitchen.currency}`}
                          </div>
                          )}
                        />
                      </Box>

                      {
                      addableComponentExcludableComponentsFilteredOut?.length > 0
                      && (
                      <CardContent>
                        <Alert severity="warning">
                          <AlertTitle>ASK TO EXCLUDE</AlertTitle>
                          <List dense>
                            {
                              addableComponentExcludableComponentsFilteredOut.map((component) => (
                                <ListItem key={component.id}>{component.name}</ListItem>
                              ))
                            }
                          </List>
                        </Alert>

                      </CardContent>
                      )
                    }
                    </Card>

                    <Divider sx={{ width: '100%' }} />
                  </Box>
                )
              })
            }
            </AccordionDetails>
          </Accordion>
          )
        }

      </Card>

      <Divider sx={{ width: '100%' }} />
    </Box>
  )
}
