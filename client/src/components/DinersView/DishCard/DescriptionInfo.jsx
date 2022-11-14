import React from 'react'
import { Typography, useTheme } from '@mui/material'

function DescriptionInfo({ data }) {
  const theme = useTheme()

  return (
    <>
      <Typography sx={{ fontWeight: 'bold', marginBottom: theme.spacing(2) }}>Description</Typography>
      <Typography>{data.longDescription}</Typography>
    </>
  )
}

export default DescriptionInfo
