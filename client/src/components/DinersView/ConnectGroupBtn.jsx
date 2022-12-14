import React from 'react'
import { t } from 'i18next'
import { Badge, IconButton, Typography } from '@mui/material'
import { ConnectIcon } from 'components/Icons/ConnectIcon'

export default function ConnectGroupBtn() {
  return (
    <IconButton disabled>
      <Badge
        color="info"
        invisible
        badgeContent={t('coming_soon')}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ConnectIcon />
        <Typography sx={{ fontSize: 12 }}>{t('connect')}</Typography>
      </Badge>
    </IconButton>
  )
}
