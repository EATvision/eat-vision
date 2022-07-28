import React from 'react'
import { useParams } from 'react-router-dom'

function RestaurantPage() {
  const params = useParams()

  return (
    <h2>
      restaurant
      {params.restaurantId}
    </h2>
  )
}

export default RestaurantPage
