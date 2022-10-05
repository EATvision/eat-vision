import React from 'react'
import {
  Box, Typography, useTheme,
} from '@mui/material'
import MenuSelector from './MenuSelector'

function MenuOptionsBanner({ dishes, filters }) {
  const theme = useTheme()

  const filteredDishes = dishes.filtered.filter((d) => !d.isMainDishFilteredOut)
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.primary.main,
        position: 'relative',
        color: theme.palette.common.white,
        padding: theme.spacing(2),
      }}
    >
      <MenuSelector />

      <Box sx={{ display: 'flex' }}>
        <Typography variant="h5">
          {filteredDishes.length}
          /
        </Typography>
        <Typography variant="h6">
          {dishes.total.length}
        </Typography>

        <Typography variant="h6" sx={{ marginLeft: theme.spacing(1) }}>options</Typography>
      </Box>
    </Box>
  )
}

export default MenuOptionsBanner
