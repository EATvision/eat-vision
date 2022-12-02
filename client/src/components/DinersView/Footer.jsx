import * as React from 'react'
import { styled } from '@mui/material/styles'
import TuneIcon from '@mui/icons-material/Tune'
import OrderIcon from '@mui/icons-material/FeedOutlined'
import CallWaiterIcon from '@mui/icons-material/EmojiPeopleOutlined'

import {
  AppBar,
  Badge,
  Box,
  CssBaseline,
  Fab,
  IconButton,
  Toolbar,
} from '@mui/material'
import { useDinerUser } from 'contexts/diner'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
// import { GroupsIcon } from 'components/Icons/GroupsIcon'
import { SlSettings as SettingsIcon } from 'react-icons/sl'

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
            disabled={location.pathname.includes('/oreder')}
            onClick={handleClickMyOrder}
          >
            <Badge
              color="primary"
              invisible={numberOfDishesInMyOrder === 0}
              badgeContent={numberOfDishesInMyOrder}
            >
              <OrderIcon />
            </Badge>
          </IconButton>

          <StyledFab color="secondary" aria-label="add">
            <CallWaiterIcon />
          </StyledFab>

          <Box sx={{ flexGrow: 1 }} />

          {/* <IconButton disableRipple>
            <GroupsIcon />
          </IconButton> */}

          <IconButton
            disabled={location.pathname.includes('/filters')}
            onClick={handleClickFilters}
          >
            <Badge
              color="primary"
              invisible={numberOfFiltersOn === 0}
              badgeContent={numberOfFiltersOn}
            >
              <TuneIcon />
            </Badge>
          </IconButton>

          <IconButton
            disableRipple
            onClick={handleClickSettings}
            disabled={
              location.pathname.includes('/settings') || !dinerUser.token
            }
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  )
}
