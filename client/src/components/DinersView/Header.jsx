import React from 'react'
import { AppBar, Box, useTheme } from '@mui/material'
import { useParams } from 'react-router-dom'

import { useKitchenById } from 'hooks/kitchens'
import MenuSelector from './MenuSelector'

function Header() {
  const theme = useTheme()
  const { kitchenId } = useParams()

  const { kitchen } = useKitchenById(kitchenId)

  return (
    <AppBar
      color="default"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        alignItems: 'center',
        padding: `${theme.spacing(1)}`,
        backgroundColor: theme.palette.primary.main,
      }}
    >
      <Box sx={{ height: 30, margin: 'auto' }}>
        <img
          className="w-full h-full object-center object-fit group-hover:opacity-75"
          src={kitchen?.image?.[0]?.url}
          alt=""
        />
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <MenuSelector />
    </AppBar>
  )
}

export default Header
