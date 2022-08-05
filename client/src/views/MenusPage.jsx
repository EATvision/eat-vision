import React from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useRestaurantMenusById } from '../hooks/restaurants'

function MenusPage() {
  const { restaurantId } = useParams()
  const { t } = useTranslation()

  const { menus, isLoading, isError } = useRestaurantMenusById(restaurantId)

  if (isLoading) return <div>LOADING</div>
  if (isError) return <div>ERROR</div>

  if (menus.length === 1) return <Navigate to={menus[0].id} />

  if (!menus.length) {
    return (
      <>
        <h2>NO MENUS FOR RESTAURANT FOUND</h2>
        <Link
          className="group flex flex-col"
          to={`/restaurants/${restaurantId}`}
          key={restaurantId}
        >
          <h3 className="mt-4 text-sm text-gray-700 group-hover:opacity-75">{t('back')}</h3>
        </Link>
      </>
    )
  }

  return (
    <>
      <h2>
        MENUS:
      </h2>

      {
        menus.map((menu) => (
          <Link
            className="group flex flex-col"
            to={`/restaurants/${restaurantId}/menus/${menu.id}`}
            key={restaurantId}
          >
            <h3 className="mt-4 text-sm text-gray-700 group-hover:opacity-75">{menu.display_name}</h3>
          </Link>
        ))
    }
    </>
  )
}

export default MenusPage
