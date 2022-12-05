import React from 'react'
import { Box } from '@mui/material'
import { useDinerOrder } from 'contexts/order'
import FoodDish from './DishCard/FoodDish'
import Header from './Header'

function MyOrderPage() {
  const dinerOrder = useDinerOrder()

  return (
    <>
      <Header />
      <Box
        sx={{
          position: 'relative',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          width: '100%',
          maxWidth: 500,
          margin: 'auto',
        }}
      >
        {dinerOrder.order.map((dish, index) => (
          <Box key={`${dish.id}-${index}`}>
            <FoodDish data={dish} />
          </Box>
        ))}
      </Box>
    </>
  )
}

export default MyOrderPage
