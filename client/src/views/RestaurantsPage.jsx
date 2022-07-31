import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useRestaurants } from '../hooks/restaurants'

function RestaurantsPage() {
  const { i18n } = useTranslation()
  const { restaurants, isLoading, isError } = useRestaurants()

  const handleClickRestaurant = (restaurant) => () => i18n.changeLanguage(restaurant.locale)

  if (isLoading) return <div>LOADING</div>
  if (isError) return <div>ERROR</div>

  return (
    <main>
      <h2>Restaurants list</h2>

      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>

          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {restaurants.map((restaurant) => (
              <Link
                className="group flex flex-col"
                to={`/restaurants/${restaurant.id}`}
                key={restaurant.id}
                onClick={handleClickRestaurant(restaurant)}
              >
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8  flex-1">
                  <img
                    src={restaurant.logo_url}
                    alt="restaurant logo"
                    className="w-full h-full object-center object-fit group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-sm text-gray-700 group-hover:opacity-75">{restaurant.display_name}</h3>
              </Link>

            ))}
          </div>
        </div>
      </div>

    </main>
  )
}

export default RestaurantsPage
