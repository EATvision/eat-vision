import React from 'react'
import { useDinerOrder } from 'contexts/order'
import { Button } from '@mui/material'
import {
  BookmarkAddOutlined as AddIcon,
  BookmarkRemoveOutlined as RemoveIcon,
} from '@mui/icons-material'
import { t } from 'i18next'

export default function DinerOrderController({ data }) {
  const dinerOrder = useDinerOrder()

  const isIncludedInOrder = dinerOrder.order.some((d) => d.id === data.id)

  const handleClickToggleDishToOrder = () => {
    dinerOrder.setOrder((currOrder) =>
      isIncludedInOrder
        ? currOrder.filter((d) => d.id !== data.id)
        : [...currOrder, data]
    )
  }

  return (
    <Button
      endIcon={isIncludedInOrder ? <RemoveIcon /> : <AddIcon />}
      color={isIncludedInOrder ? 'error' : 'primary'}
      variant="contained"
      onClick={handleClickToggleDishToOrder}
      sx={{
        width: 110,
        borderRadius: 2,
        borderBottomRightRadius: 0,
        borderTopRightRadius: 0,
        marginLeft: 'auto',
        // height: 60,
        // fontSize: '1.15rem',
      }}
    >
      {isIncludedInOrder ? t('remove') : t('add')}
    </Button>
  )
}
