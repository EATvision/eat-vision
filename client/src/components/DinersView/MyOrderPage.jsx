import React from 'react'
import { Box, Button, useTheme } from '@mui/material'
import { useDinerOrder } from 'contexts/order'
import FoodDish from './DishCard/FoodDish'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import FixedBottomConrainer from 'components/FixedBottomContainer'

function MyOrderPage() {
  const theme = useTheme()
  const navigate = useNavigate()
  const dinerOrder = useDinerOrder()

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
            <FoodDish data={dish} index={index} />
          </Box>
        ))}
      </Box>

      <FixedBottomConrainer>
        <Button onClick={handleClickBack}>{t('back')}</Button>

        <Button fullWidth variant="contained" color="primary">
          {t('complete_order')}
        </Button>
      </FixedBottomConrainer>
    </>
  )
}

export default MyOrderPage
