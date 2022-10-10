import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import DishesList from './DishesList'

function DishesManagerPage() {
  const navigate = useNavigate()

  const handleClickAddNewDish = () => {
    navigate('new')
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClickAddNewDish}
      >
        Add new dish
      </Button>
      <DishesList />
    </div>
  )
}

export default DishesManagerPage
