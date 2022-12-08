import React from 'react'
import { useNavigate } from 'react-router-dom'

import { styled, List, ListItem, Box } from '@mui/material'

import { useKitchen } from 'contexts/kitchen'
import { useDishesByKitchenId } from 'hooks/dishes'
import { t } from 'i18next'

function DishesList() {
  const { kitchenId } = useKitchen()
  const { dishes, isLoading } = useDishesByKitchenId(kitchenId)

  if (isLoading) return <div>{t('loading')}</div>

  return (
    <Box py={2}>
      <List>
        {dishes?.map((dish) => (
          <Dish key={dish._id} data={dish} />
        ))}
      </List>
    </Box>
  )
}

const DishItem = styled(ListItem)(({ theme }) => ({
  border: '1px solid',
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  borderRadius: theme.spacing(0.5),
  borderColor: theme.palette.divider,
}))

function Dish({ data }) {
  const navigate = useNavigate()

  const handleClickDish = () => {
    navigate(`/customers/dishes/${data._id}`)
  }

  return (
    <DishItem button onClick={handleClickDish}>
      {data.name}
    </DishItem>
  )
}

export default DishesList
