import React from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { t } from 'i18next'
import { useDinerUser } from 'contexts/diner'

function Settings() {
  const theme = useTheme()
  const navigate = useNavigate()
  const location = useLocation()
  const { menuId, kitchenId } = location.state
  const dinerUser = useDinerUser()

  React.useEffect(() => {
    if (!dinerUser.token) {
      if (kitchenId && menuId) {
        navigate(`/diners/kitchens/${kitchenId}/menus/${menuId}`)
      } else {
        navigate('/diners/kitchens')
      }
    }
  }, [dinerUser.token, kitchenId, menuId, navigate])

  const handleLogout = async () => {
    dinerUser.signout()

    if (kitchenId && menuId) {
      navigate(`/diners/kitchens/${kitchenId}/menus/${menuId}`)
    } else {
      navigate('/diners/kitchens')
    }
  }

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h5" sx={{ marginTop: theme.spacing(2) }}>
        {t('settings')}
      </Typography>

      <Button
        sx={{ width: '100%', maxWidth: 300, margin: 'auto', marginBottom: 0 }}
        onClick={handleLogout}
        variant="contained"
        color="secondary"
      >
        {t('logout')}
      </Button>
    </Box>
  )
}

export default Settings
