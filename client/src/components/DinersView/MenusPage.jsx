import React from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { useParams, Navigate, useNavigate } from 'react-router-dom'

import { getRelevantMenus } from 'utils/menus'
import { useV1KitchenById, useKitchenMenusById } from 'hooks/kitchens'
import FixedBottomConrainer from 'components/FixedBottomContainer'

function MenusPage() {
  const theme = useTheme()
  const navigate = useNavigate()
  const { kitchenId } = useParams()
  const { t } = useTranslation()

  const { kitchen } = useV1KitchenById(kitchenId)
  const { menus, isLoading, isError } = useKitchenMenusById(kitchenId)

  const relevantMenus = getRelevantMenus(menus)

  const handleClickBack = () => {
    navigate('/diners/kitchens')
  }
  if (isLoading) return <div>{t('loading')}</div>
  if (isError) return <div>ERROR</div>

  if (relevantMenus?.length === 1)
    return <Navigate to={relevantMenus[0].id} replace />

  if (!relevantMenus.length) {
    return (
      <Box
        sx={{
          maxWidth: 500,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          margin: 'auto',
          padding: `0 ${theme.spacing(2)}`,
        }}
      >
        <Box
          sx={{
            margin: '0 auto',
            marginTop: theme.spacing(2),
            height: 100,
            width: 250,
            backgroundSize: 'contain',
            backgroundImage: `url(${kitchen?.image?.[0]?.url})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
          }}
        ></Box>

        <Typography variant="h6" sx={{ marginTop: theme.spacing(4) }}>
          {t('no_menus_relevant_now')}
        </Typography>

        <Typography variant="p">{t('menus_in_other_working_hours')}</Typography>

        <MenusList menus={menus} />

        <FixedBottomConrainer>
          <Button color="primary" fullWidth onClick={handleClickBack}>
            {t('back')}
          </Button>
        </FixedBottomConrainer>
      </Box>
    )
  }
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
      {menus?.map((menu) => (
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
