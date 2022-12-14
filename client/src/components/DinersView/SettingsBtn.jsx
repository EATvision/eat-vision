import React from 'react'
import { IconButton, Typography } from '@mui/material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { SettingsIcon } from 'components/Icons/SettingsIcon'
import { t } from 'i18next'

export default function SettingsBtn({ showLabel, sx }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { kitchenId, menuId } = useParams()

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
        ...sx,
      }}
      disabled={location.pathname.includes('/settings')}
    >
      <SettingsIcon />
      {showLabel && (
        <Typography sx={{ fontSize: 12 }}>{t('settings')}</Typography>
      )}
    </IconButton>
  )
}
