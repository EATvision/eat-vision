import React from 'react'
import {
  Avatar, Box, Typography, useTheme,
} from '@mui/material'

function MenuOptionsBanner({ dishes, filters }) {
  const theme = useTheme()

  const filteredDishes = dishes.filtered.filter((d) => !d.isMainDishFilteredOut)
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.primary.main,
        position: 'relative',
        height: 80,
        color: theme.palette.common.white,
      }}
    >
      options
      {filteredDishes.length}
      /
      {dishes.total.length}
    </Box>
  )
}

export default MenuOptionsBanner
