import * as React from 'react'
import { styled } from '@mui/material/styles'

import {
  AppBar,
  Badge,
  Box,
  CssBaseline,
  Fab,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material'
import { useDinerUser } from 'contexts/diner'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { ConnectIcon } from 'components/Icons/ConnectIcon'
import { SettingsIcon } from 'components/Icons/SettingsIcon'
import { MyListIcon } from 'components/Icons/MyListIcon'
import { ProfileIcon } from 'components/Icons/ProfileIcon'
import { RaiseHandIcon } from 'components/Icons/RaiseHandIcon2'
import { t } from 'i18next'

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
})

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()
  const { kitchenId, menuId } = useParams()

  const dinerUser = useDinerUser()
  const numberOfFiltersOn = Object.keys(dinerUser.user.filters).reduce(
    (acc, filterName) => acc + dinerUser.user.filters[filterName].length,
    0
  )

  const numberOfDishesInMyOrder = 0

  const handleClickMyOrder = () => {
    if (kitchenId && menuId) {
      navigate(`/diners/kitchens/${kitchenId}/menus/${menuId}/myorder`)
    } else {
      navigate(-1)
    }
  }

  const handleClickFilters = () => {
    if (kitchenId && menuId) {
      navigate(`/diners/kitchens/${kitchenId}/menus/${menuId}/filters/1`)
    } else {
      navigate(-1)
    }
  }

  const handleClickSettings = () => {
    navigate('/diners/settings', { state: { kitchenId, menuId } })
  }

  return (
    <React.Fragment>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{ top: 'auto', bottom: 0, backgroundColor: '#E9E9E9' }}
      >
        <Toolbar>
          <IconButton
            disableRipple
            onClick={handleClickSettings}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            disabled={
              location.pathname.includes('/settings') || !dinerUser.token
            }
          >
            <SettingsIcon />
            <Typography sx={{ fontSize: 12 }}>{t('settings')}</Typography>
          </IconButton>

          <IconButton
            disabled
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <ConnectIcon />
            <Typography sx={{ fontSize: 12 }}>{t('connect')}</Typography>
          </IconButton>

          <Box sx={{ flexGrow: 1 }} />

          <StyledFab color="secondary" aria-label="add">
            <RaiseHandIcon fonSize="large" />
          </StyledFab>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            disabled={location.pathname.includes('/myorder')}
            onClick={handleClickMyOrder}
          >
            <Badge
              color="primary"
              invisible={numberOfDishesInMyOrder === 0}
              badgeContent={numberOfDishesInMyOrder}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <MyListIcon />
              <Typography sx={{ fontSize: 12 }}>{t('my_list')}</Typography>
            </Badge>
          </IconButton>

          <IconButton
            disabled={location.pathname.includes('/filters')}
            onClick={handleClickFilters}
          >
            <Badge
              color="primary"
              invisible={numberOfFiltersOn === 0}
              badgeContent={numberOfFiltersOn}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <ProfileIcon />
              <Typography sx={{ fontSize: 12 }}>{t('profile')}</Typography>
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
