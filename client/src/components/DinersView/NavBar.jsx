import React from 'react'
import { AppBar, Badge, Button, IconButton, Tooltip } from '@mui/material'
import { SlSettings as SettingsIcon } from 'react-icons/sl'

import TuneIcon from '@mui/icons-material/Tune'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { t } from 'i18next'
import { useDinerUser } from 'contexts/diner'
import { GroupsIcon } from 'components/Icons/GroupsIcon'

function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { kitchenId, menuId } = useParams()

  const dinerUser = useDinerUser()

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

  const numberOfFiltersOn = Object.keys(dinerUser.user.filters).reduce(
    (acc, filterName) => acc + dinerUser.user.filters[filterName].length,
    0
  )

  return (
    <AppBar
      color="default"
      sx={{ display: 'flex', flexDirection: 'row', position: 'relative' }}
    >
      <Button
        sx={{ padding: '3px' }}
        color="inherit"
        fullWidth
        onClick={handleClickFilters}
        disabled={location.pathname.includes('/filters')}
      >
        <IconButton
          disableRipple
          disabled={location.pathname.includes('/filters')}
        >
          <Badge
            color="primary"
            invisible={numberOfFiltersOn === 0}
            badgeContent={numberOfFiltersOn}
          >
            <TuneIcon />
          </Badge>
        </IconButton>
      </Button>

      <Tooltip title={t('coming_soon')} enterTouchDelay={0}>
        <Button sx={{ padding: 0 }} color="inherit" fullWidth>
          <IconButton disableRipple>
            <GroupsIcon />
          </IconButton>
        </Button>
      </Tooltip>

      <Button
        sx={{ padding: '3px' }}
        color="inherit"
        fullWidth
        onClick={handleClickSettings}
        disabled={location.pathname.includes('/settings') || !dinerUser.token}
      >
        <IconButton
          disableRipple
          disabled={location.pathname.includes('/settings') || !dinerUser.token}
        >
          <SettingsIcon />
        </IconButton>
      </Button>
    </AppBar>
  )
}

export default NavBar
