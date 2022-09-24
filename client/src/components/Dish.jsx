import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, CardHeader,
  CardMedia, Collapse, Divider, IconButton, List, ListItem, styled, Typography, useTheme,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import ClampLines from 'react-clamp-lines'

import { useKitchenById } from '../hooks/kitchens'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}))

export default function Dish({ data }) {
  const theme = useTheme()
  const { kitchenId } = useParams()
  const { kitchen } = useKitchenById(kitchenId)

  const [expandedSideDishes, setExpandedSideDishes] = React.useState(false)

  const handleExpandClick = () => {
    setExpandedSideDishes(!expandedSideDishes)
  }

  const dishExcludableComponentsFilteredOut = data?.recipe?.excludable?.filter(
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
             left: '50%',
             top: '50%',
             transform: 'translate(-50%, -50%)',
           }}
         >
           FILTERED OUT
         </Alert>
         )
      }
      <Card sx={{ width: '100%', opacity: data.isMainDishFilteredOut ? 0.2 : 1 }} elevation={0}>
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
              <List>
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

        <CardActions disableSpacing>
          {
            data.recipe.sideDish.length > 0
            && (
              <Button
                onClick={handleExpandClick}
              >
                <ExpandMore
                  expand={expandedSideDishes}
                  aria-expanded={expandedSideDishes}
                  aria-label="side dishes"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
                <Typography>Side dishes</Typography>
              </Button>
            )
          }
        </CardActions>

        <Collapse in={expandedSideDishes} timeout="auto" unmountOnExit>
          {
            data.recipe.sideDish.map((dish) => (
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
                    FILTERED OUT
                  </Alert>
                  )
                }
                <Card sx={{ width: '100%', opacity: dish.isMainDishFilteredOut ? 0.2 : 1 }} elevation={0}>
                  <Box sx={{ display: 'flex', backgroundColor: '#f1f1f1' }}>
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
                    dishExcludableComponentsFilteredOut?.length > 0
                    && (
                    <CardContent>
                      <Alert severity="warning">
                        <AlertTitle>ASK TO EXCLUDE</AlertTitle>
                        <List>
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
                </Card>

                <Divider sx={{ width: '100%' }} />
              </Box>
            ))
          }
        </Collapse>
      </Card>

      <Divider sx={{ width: '100%' }} />
    </Box>
  )
}
