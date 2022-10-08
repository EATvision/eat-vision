import React from 'react'
import {
  Box, IconButton, List, ListItem, ListItemButton, ListItemText, Paper, Typography, useTheme,
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import RemoveIcon from '@mui/icons-material/Remove'

import { useNavigate } from 'react-router-dom'
import { useDishes } from '../../../api/dishes'

function DishesList() {
  const { dishes, isLoading } = useDishes()

  if (isLoading) return <div>LOADING</div>

  return (
    <List>
      {
        dishes?.map((dish) => (<Dish key={dish._id} data={dish} />))
      }
    </List>
  )
}

function Dish({ data }) {
  const navigate = useNavigate()
  const handleClickDish = () => {
    navigate(`/customers/dishes/${data._id}`)
  }

  return (
    <ListItem>
      <ListItemButton onClick={handleClickDish}>
        <ListItemText primary={data.name} />
      </ListItemButton>
    </ListItem>
  )
}

export default DishesList
