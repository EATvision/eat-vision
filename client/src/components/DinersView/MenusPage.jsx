import React from 'react'
import { Link, useParams, Navigate, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Box, Button, Typography, useTheme } from '@mui/material'
import { useKitchenById, useKitchenMenusById } from '../../hooks/kitchens'

function MenusPage() {
  const theme = useTheme()
  const navigate = useNavigate()
  const { kitchenId } = useParams()
  const { t } = useTranslation()

  const { kitchen } = useKitchenById(kitchenId)
  const { menus, isLoading, isError } = useKitchenMenusById(kitchenId)

  if (isLoading) return <div>LOADING</div>
  if (isError) return <div>ERROR</div>

  if (menus?.length === 1) return <Navigate to={menus[0].id} replace />

  if (!menus.length) {
    return (
      <>
        <h2>NO MENUS FOR KITCHEN FOUND</h2>
        <Link
          className="group flex flex-col"
          to={`/diners/kitchens/${kitchenId}`}
          key={kitchenId}
        >
          <h3 className="mt-4 text-sm text-gray-700 group-hover:opacity-75">
            {t('back')}
          </h3>
        </Link>
      </>
    )
  }

  const handleClickMenu = (menuId) => () => {
    navigate(`/diners/kitchens/${kitchenId}/menus/${menuId}`)
  }

  return (
    <>
      <Box sx={{ margin: theme.spacing(2) }}>
        <div className="w-[150px] mx-auto mt-4 aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
          <img
            className="w-full h-full object-center object-fit group-hover:opacity-75"
            src={kitchen?.image?.[0]?.url}
            alt=""
          />
        </div>
        <Typography variant="h5">{kitchen.name}</Typography>
      </Box>

      <Typography variant="h5">{t('menu_options')}</Typography>

      {menus.map((menu) => (
        <Button
          key={menu.id}
          fullWidth
          sx={{ marginTop: theme.spacing(1) }}
          variant="outlined"
          onClick={handleClickMenu(menu.id)}
        >
          {menu.name}
        </Button>
      ))}
    </>
  )
}

export default MenusPage
