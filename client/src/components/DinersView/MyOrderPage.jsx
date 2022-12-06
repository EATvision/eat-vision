import React from 'react'
import { AppBar, Box, Button, Typography, useTheme } from '@mui/material'
import { useDinerOrder } from 'contexts/order'
import FoodDish from './DishCard/FoodDish'
import { t } from 'i18next'
import { useNavigate, useParams } from 'react-router-dom'
import { useKitchenById } from 'hooks/kitchens'

function MyOrderPage() {
  const theme = useTheme()
  const { kitchenId } = useParams()
  const navigate = useNavigate()
  const dinerOrder = useDinerOrder()
  const { kitchen } = useKitchenById(kitchenId)

  const handleClickBack = () => {
    navigate(-1)
  }

  return (
    <>
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
          padding: theme.spacing(1),
        }}
      >
        {dinerOrder.order.map((dish, index) => (
          <Box key={`${dish.id}-${index}`}>
            <FoodDish data={dish} hideOrderControls />
          </Box>
        ))}
      </Box>

      <AppBar
        position="static"
        sx={{
          padding: theme.spacing(2),
          textAlign: 'start',
          backgroundColor: 'black',
        }}
      >
        <Typography variant="h7">
          {t('order_summary')}:{' '}
          <b>
            {dinerOrder.totalSum || 0}
            {kitchen.currency}
          </b>
        </Typography>

        <Box sx={{ display: 'flex', marginTop: theme.spacing(1) }}>
          <Button onClick={handleClickBack}>{t('back')}</Button>

          <Button fullWidth variant="contained" color="secondary">
            {t('complete_order')}
          </Button>
        </Box>
      </AppBar>
    </>
  )
}

export default MyOrderPage
