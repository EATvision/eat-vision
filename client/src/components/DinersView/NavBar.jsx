import React from 'react'
import {
  AppBar, Badge, Button, IconButton, Tooltip,
} from '@mui/material'
import { SlSettings as SettingsIcon } from 'react-icons/sl'

import TuneIcon from '@mui/icons-material/Tune'
import { MdOutlineGroups as GroupsIcon } from 'react-icons/md'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { t } from 'i18next'

function NavBar({ filters }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { kitchenId, menuId } = useParams()

  const handleClickFilters = () => {
    if (kitchenId && menuId) {
      navigate(`/diners/kitchens/${kitchenId}/menus/${menuId}/filters/1`)
    } else {
      navigate('/diners/filters')
    }
  }

  const numberOfFiltersOn = Object.keys(filters).reduce((acc, filterName) => acc + filters[filterName].length, 0)

  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{ display: 'flex', flexDirection: 'row' }}
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
            color="info"
            invisible={numberOfFiltersOn === 0}
            badgeContent={numberOfFiltersOn}
          >
            <TuneIcon />
          </Badge>
        </IconButton>
      </Button>

      <Tooltip
        title={t('coming_soon')}
        enterTouchDelay={0}
      >
        <Button
          sx={{ padding: 0 }}
          color="inherit"
          fullWidth
        >
          <IconButton disableRipple>
            <GroupsIcon />
          </IconButton>
        </Button>
      </Tooltip>

      <Tooltip
        title={t('coming_soon')}
        enterTouchDelay={0}
      >
        <Button
          sx={{ padding: 0 }}
          color="inherit"
          fullWidth
        >
          <IconButton disableRipple>
            <SettingsIcon />
          </IconButton>
        </Button>
      </Tooltip>
    </AppBar>
  )
}

export default NavBar
