import React from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { useDinerOrder } from 'contexts/order'
import FoodDish from './DishCard/FoodDish'
import { t } from 'i18next'
import { useNavigate } from 'react-router-dom'
import FixedBottomConrainer from 'components/FixedBottomContainer'
import WaiterBanner from './WaiterBanner'

function MyOrderPage() {
  const theme = useTheme()
  const navigate = useNavigate()
  const dinerOrder = useDinerOrder()

  const handleClickBack = () => {
    navigate(-1)
  }

  return (
    <>
      <WaiterBanner
        title={
          dinerOrder.order.length === 0
            ? t('my_order_title_no_choices')
            : t('my_order_title')
        }
        subtitle={dinerOrder.order.length === 0 ? '' : t('my_order_subtitle')}
      />
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
          marginBottom: '70px',
        }}
      >
        {dinerOrder.order.length === 0 ? (
          <Typography
            sx={{
              fontSize: '2.5rem',
              textAlign: 'center',
              margin: 'auto',
              flex: 1,
              alignItems: 'center',
              display: 'flex',
              color: 'rgb(128 128 128 / 25%)',
            }}
          >
            {t('empty_order')}
          </Typography>
        ) : (
          <>
            {dinerOrder?.order?.map((dish, index) => (
              <Box key={`${dish.id}-${index}`}>
                <FoodDish data={dish} index={index} />
              </Box>
            ))}
          </>
        )}
      </Box>

      <FixedBottomConrainer>
        <Button fullWidth onClick={handleClickBack}>
          {t('back')}
        </Button>
        {/* {dinerOrder?.order?.length > 0 && (
          <Button fullWidth variant="contained" color="primary">
            {t('complete_order')}
          </Button>
        )} */}
      </FixedBottomConrainer>
    </>
  )
}

export default MyOrderPage
