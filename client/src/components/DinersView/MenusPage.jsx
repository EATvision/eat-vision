import React from 'react'
import {
  Link, useParams, Navigate, useNavigate,
} from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Button } from '@mui/material'
import { useKitchenMenusById } from '../../hooks/kitchens'

function MenusPage() {
  const navigate = useNavigate()
  const { kitchenId } = useParams()
  const { t } = useTranslation()

  const { menus, isLoading, isError } = useKitchenMenusById(kitchenId)

  if (isLoading) return <div>LOADING</div>
  if (isError) return <div>ERROR</div>

  if (menus?.length === 1) return <Navigate to={menus[0].id} />

  if (!menus.length) {
    return (
      <>
        <h2>NO MENUS FOR KITCHEN FOUND</h2>
        <Link
          className="group flex flex-col"
          to={`/diners/kitchens/${kitchenId}`}
          key={kitchenId}
        >
          <h3 className="mt-4 text-sm text-gray-700 group-hover:opacity-75">{t('back')}</h3>
        </Link>
      </>
    )
  }

  const handleClickMenu = (menuId) => () => {
    navigate(`/diners/kitchens/${kitchenId}/menus/${menuId}`)
  }

  return (
    <>
      <h2>
        {t('menu_options')}
      </h2>

      {
        menus.map((menu) => (
          <Button
            fullWidth
            onClick={handleClickMenu(menu.id)}
          >
            {menu.name}
          </Button>
        ))
    }
    </>
  )
}

export default MenusPage
