import React from 'react'
import { Box, Button, styled, Typography } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { t } from 'i18next'
import { useDinerUser } from 'contexts/diner'

const LtrTypography = styled(Typography)`
  /* @noflip */
  direction: ltr;
`

function Settings() {
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
      {dinerUser.token && (
        <Box sx={{ width: '100%', maxWidth: 300, margin: 'auto' }}>
          <Typography variant="h5">{t('signed_in_user')}</Typography>
          <LtrTypography variant="h5">
            {dinerUser.user.phoneNumber || t('anonymus')}
          </LtrTypography>

          <Button
            sx={{ width: '100%', maxWidth: 300, margin: 'auto' }}
            onClick={handleLogout}
            variant="contained"
            color="secondary"
          >
            {t('logout')}
          </Button>
        </Box>
      )}
    </Box>
  )
}

export default Settings
