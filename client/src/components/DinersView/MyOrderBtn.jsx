import React from 'react'
import { t } from 'i18next'
import { Badge, IconButton, Typography } from '@mui/material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useDinerOrder } from 'contexts/order'
import { MyListIcon } from 'components/Icons/MyListIcon'

export default function MyOrderBtn() {
  const navigate = useNavigate()
  const location = useLocation()
  const { kitchenId, menuId } = useParams()
  const dinerOrder = useDinerOrder()

  const numberOfDishesInMyOrder = dinerOrder?.order.length

  const handleClickMyOrder = () => {
    if (kitchenId && menuId) {
      navigate(`/diners/kitchens/${kitchenId}/menus/${menuId}/myorder`)
    } else {
      navigate(-1)
    }
  }

  return (
    <IconButton
      disabled={location.pathname.includes('/myorder')}
      onClick={handleClickMyOrder}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Badge
        color="primary"
        invisible={numberOfDishesInMyOrder === 0}
        badgeContent={numberOfDishesInMyOrder}
      >
        <MyListIcon />
      </Badge>
      <Typography sx={{ fontSize: 12 }}>{t('my_list')}</Typography>
    </IconButton>
  )
}
