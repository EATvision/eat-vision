import React from 'react'
import { t } from 'i18next'
import { IconButton, Typography } from '@mui/material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useDinerUser } from 'contexts/diner'
import { SettingsIcon } from 'components/Icons/SettingsIcon'

export default function SettingsBtn() {
  const navigate = useNavigate()
  const location = useLocation()
  const { kitchenId, menuId } = useParams()
  const dinerUser = useDinerUser()

  const handleClickSettings = () => {
    navigate('/diners/settings', { state: { kitchenId, menuId } })
  }

  return (
    <IconButton
      disableRipple
      onClick={handleClickSettings}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      disabled={location.pathname.includes('/settings') || !dinerUser.token}
    >
      <SettingsIcon />
      <Typography sx={{ fontSize: 12 }}>{t('settings')}</Typography>
    </IconButton>
  )
}
