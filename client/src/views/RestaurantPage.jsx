import React from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useRestaurantById } from '../hooks/restaurants'

function RestaurantPage() {
  const { restaurantId } = useParams()
  const { t, i18n } = useTranslation()

  const { restaurant, isLoading, isError } = useRestaurantById(restaurantId)

  React.useEffect(() => {
    if (restaurant) {
      i18n.changeLanguage(restaurant.locale)
    }
  }, [restaurant])

  if (isLoading) return <div>LOADING</div>
  if (isError) return <div>ERROR</div>

  return (
    <>
      <h1>{t('Welcome to React')}</h1>
      <h2>
        restaurant
        {restaurantId}
      </h2>
    </>
  )
}

export default RestaurantPage
