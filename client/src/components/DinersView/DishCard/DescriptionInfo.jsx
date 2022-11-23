import React from 'react'
import { Typography, useTheme } from '@mui/material'
import { t } from 'i18next'

function DescriptionInfo({ data }) {
  const theme = useTheme()

  return (
    <>
      <Typography sx={{ fontWeight: 'bold', marginBottom: theme.spacing(2) }}>
        {t('description')}
      </Typography>
      <Typography>{data.longDescription}</Typography>
    </>
  )
}

export default DescriptionInfo
