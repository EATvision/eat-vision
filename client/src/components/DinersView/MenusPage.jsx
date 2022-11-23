import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { useParams, Navigate, useNavigate } from 'react-router-dom'

import { getRelevantMenus } from 'utils/menus'
import { useKitchenById, useKitchenMenusById } from 'hooks/kitchens'

function MenusPage() {
  const theme = useTheme()
  const navigate = useNavigate()
  const { kitchenId } = useParams()
  const { t } = useTranslation()

  const { kitchen } = useKitchenById(kitchenId)
  const { menus, isLoading, isError } = useKitchenMenusById(kitchenId)

  const relevantMenus = getRelevantMenus(menus)

  const handleClickBack = () => {
    navigate('/diners/kitchens')
  }
  if (isLoading) return <div>LOADING</div>
  if (isError) return <div>ERROR</div>

  if (relevantMenus?.length === 1)
    return <Navigate to={relevantMenus[0].id} replace />

  if (!relevantMenus.length) {
    return (
      <>
        <Box sx={{ margin: theme.spacing(2) }}>
          <div className="w-[150px] mx-auto aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
            <img
              className="w-full h-full object-center object-fit group-hover:opacity-75"
              src={kitchen?.image?.[0]?.url}
              alt=""
            />
          </div>
          <Typography variant="h5">{kitchen.name}</Typography>
        </Box>

        <Typography variant="h6">{t('no_menus_relevant_now')}</Typography>

        <Typography variant="p">{t('menus_in_other_working_hours')}</Typography>

        <MenusList menus={menus} />

        <Button
          variant={'contained'}
          color="secondary"
          sx={{ marginTop: 'auto' }}
          onClick={handleClickBack}
        >
          {t('back')}
        </Button>
      </>
    )
  }

  return (
    <>
      <Box sx={{ margin: theme.spacing(2) }}>
        <div className="w-[150px] mx-auto aspect-w-1 aspect-h-1 bg-gray-200 overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
          <img
            className="w-full h-full object-center object-fit group-hover:opacity-75"
            src={kitchen?.image?.[0]?.url}
            alt=""
          />
        </div>
        <Typography variant="h5">{kitchen.name}</Typography>
      </Box>

      <Typography variant="h5">{t('menu_options')}</Typography>
      <MenusList menus={relevantMenus} />
    </>
  )
}

const MenusList = ({ menus }) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const { kitchenId } = useParams()

  const handleClickMenu = (menuId) => () => {
    navigate(`/diners/kitchens/${kitchenId}/menus/${menuId}`)
  }

  return (
    <Box sx={{ maxWidth: 300, margin: '0 auto', width: '100%' }}>
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
    </Box>
  )
}

export default MenusPage
