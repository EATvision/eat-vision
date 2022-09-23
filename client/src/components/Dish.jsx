import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Alert, AlertTitle, Box, Card, CardContent, CardHeader,
  CardMedia, Divider, List, ListItem, Typography,
} from '@mui/material'
import ClampLines from 'react-clamp-lines'

import { useKitchenById } from '../hooks/kitchens'

export default function Dish({ data }) {
  const { kitchenId } = useParams()
  const { kitchen } = useKitchenById(kitchenId)

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

        <CardContent>
          {
            dishExcludableComponentsFilteredOut?.length > 0
            && (

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

            )
          }

        </CardContent>
      </Card>

      <Divider sx={{ width: '100%' }} />
    </Box>
  )
}
