import React from 'react'
import { Link, useParams, Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useKitchenMenusById } from '../../hooks/kitchens'

function MenusPage() {
  const { kitchenId } = useParams()
  const { t } = useTranslation()

  const { menus, isLoading, isError } = useKitchenMenusById(kitchenId)

  if (isLoading) return <div>LOADING</div>
  if (isError) return <div>ERROR</div>

  if (menus.length === 1) return <Navigate to={menus[0].id} />

  if (!menus.length) {
    return (
      <>
        <h2>NO MENUS FOR KITCHEN FOUND</h2>
        <Link
          className="group flex flex-col"
          to={`/kitchens/${kitchenId}`}
          key={kitchenId}
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
            to={`/kitchens/${kitchenId}/menus/${menu.id}`}
            key={kitchenId}
          >
            <h3 className="mt-4 text-sm text-gray-700 group-hover:opacity-75">{menu.name}</h3>
          </Link>
        ))
    }
    </>
  )
}

export default MenusPage
