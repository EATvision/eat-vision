import React from 'react'
import {
  Avatar, Box, Fab, styled, Typography, useTheme,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
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

function Footer({ dishes, showWaiterBtn }) {
  const theme = useTheme()
  return (
    <Box sx={{
      display: 'flex',
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      alignItems: 'center',
      fontFamily: 'Roboto',
      padding: theme.spacing(1),
      position: 'fixed',
      bottom: 0,
      width: '100%',
    }}
    >
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

    </Box>
  )
}

function OptionsContainer({ dishes }) {
  const theme = useTheme()
  const { t } = useTranslation()
  const filteredDishes = dishes.filtered.filter((d) => !d.isMainDishFilteredOut)

  return (
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      flex: 1,
    }}
    >
      <Box sx={{ display: 'flex', alignItems: 'end', direction: 'ltr' }}>
        <Typography sx={{ fontSize: '1.2rem' }}>
          {filteredDishes.length}
          /
        </Typography>
        <Typography>
          {dishes.total.length}
        </Typography>
      </Box>

      <Typography sx={{ margin: `0 ${theme.spacing(1)}`, fontSize: '1.2rem' }}>{t('options').toLocaleUpperCase()}</Typography>
    </Box>
  )
}

export default Footer
