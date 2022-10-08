import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert, AlertTitle, Box, Card, CardContent, CardHeader,
  Divider, List, ListItem, Typography, useTheme, ToggleButtonGroup, ToggleButton,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import ClampLines from 'react-clamp-lines'

import { useKitchenById } from '../../../hooks/kitchens'

export default function DishAccordion({ data }) {
  const theme = useTheme()
  const { kitchenId } = useParams()
  const { kitchen } = useKitchenById(kitchenId)

  const [expandedInfoPanel, setExpandedInfoPanel] = React.useState(null)
  const [isDishExpandedInfoAccordianExpanded, setIsDishExpandedInfoAccordianExpanded] = React.useState(0)

  const handleChangeExpandedInfoPanel = (event, newExpandedInfoPanel) => {
    event.stopPropagation()
    setExpandedInfoPanel(newExpandedInfoPanel)
    setIsDishExpandedInfoAccordianExpanded(!!newExpandedInfoPanel)
  }

  const handleClickExpandedInfoAccordian = () => {
    if (!expandedInfoPanel) {
      return setIsDishExpandedInfoAccordianExpanded(false)
    }
    return setIsDishExpandedInfoAccordianExpanded((currIsExpanded) => !currIsExpanded)
  }
  return (

    <Accordion
      expanded={isDishExpandedInfoAccordianExpanded}
      onChange={handleClickExpandedInfoAccordian}
    >
      <AccordionSummary
        expandIcon={expandedInfoPanel && <ExpandMoreIcon />}
      >
        <ToggleButtonGroup
          color="primary"
          value={expandedInfoPanel}
          exclusive
          onChange={handleChangeExpandedInfoPanel}
        >
          {/* <ToggleButton value="sideDish" disabled={data?.recipe?.sideDish?.length === 0}>side dish</ToggleButton> */}
          <ToggleButton value="addableComponents" disabled={data?.recipe?.addableComponents?.length === 0}>upgrades</ToggleButton>
        </ToggleButtonGroup>
      </AccordionSummary>
      <AccordionDetails>
        {
              expandedInfoPanel === 'sideDish'
              && data?.recipe?.sideDish?.map((dish) => {
                const sideDishExcludableComponentsFilteredOut = dish?.recipe?.excludable?.filter(
                  (component) => component.isFilteredOut,
                )

                return (
                  <Box
                    key={`sideDish-${dish.id}`}
                    sx={{
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

        {
              expandedInfoPanel === 'addableComponents'
              && data?.recipe?.addableComponents?.map((dish) => {
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
