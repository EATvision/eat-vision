import React from 'react'
import { useParams } from 'react-router-dom'
import { useDishById } from '../../../api/dishes'
import DishForm from '../DishForm/DishForm'

function DishPage() {
  const { dishId } = useParams()

  const { dish, isLoading } = useDishById(dishId === 'new' ? null : dishId)

  if (dishId !== 'new' && isLoading) return <div>LOADING</div>

  return (
    <div>
      {dishId}
      <DishForm data={dish} />
    </div>
  )
}

export default DishPage
