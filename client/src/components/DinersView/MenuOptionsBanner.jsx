import React from 'react'
import {
  AppBar,
  Avatar,
  Box, Button, Fab, styled, Toolbar, Typography, useTheme,
} from '@mui/material'
import MenuSelector from './MenuSelector'
import waiterSrc from '../../images/waiter_transparent_halfbody.png'

const WAITER_AVATAR_WIDTH = 70

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -20,
  left: 0,
  right: 0,
  margin: '0 auto',
  width: 'fit-content',
  height: 'fit-content',
  borderRadius: 100,
})

function MenuOptionsBanner({ dishes, showWaiterBtn }) {
  const theme = useTheme()
  return (
    <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>

        <MenuSelector />

        {
          showWaiterBtn
          && (
          <StyledFab sx={{ border: `1px solid ${theme.palette.primary.main}` }} aria-label="add" variant="contained">
            <Avatar
              src={waiterSrc}
              sx={{
                width: WAITER_AVATAR_WIDTH,
                height: WAITER_AVATAR_WIDTH,
              }}
            />
            {/* <Typography>
              Need Help?
            </Typography> */}
          </StyledFab>
          )
        }

        <Box sx={{ flexGrow: 1 }} />

        <OptionsContainer dishes={dishes} />
      </Toolbar>
    </AppBar>
  )
}

function OptionsContainer({ dishes }) {
  const filteredDishes = dishes.filtered.filter((d) => !d.isMainDishFilteredOut)
  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1,
    }}
    >
      <Box sx={{ display: 'flex' }}>
        <Typography>
          {filteredDishes.length}
          /
        </Typography>
        <Typography>
          {dishes.total.length}
        </Typography>
      </Box>

      <Typography sx={{ fontSize: '0.75rem' }}>options</Typography>
    </Box>
  )
}

export default MenuOptionsBanner
