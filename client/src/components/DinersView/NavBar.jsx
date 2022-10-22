import React from 'react'
import {
  AppBar, Badge, Button, IconButton,
} from '@mui/material'
import { SlSettings as SettingsIcon } from 'react-icons/sl'

import TuneIcon from '@mui/icons-material/Tune'
import { MdOutlineGroups as GroupsIcon } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'

function NavBar({ filters }) {
  const navigate = useNavigate()

  const handleClickFilters = () => {
    navigate('/diners/filters')
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
      >
        <IconButton disableRipple>
          <Badge
            color="info"
            invisible={numberOfFiltersOn === 0}
            badgeContent={numberOfFiltersOn}
          >
            <TuneIcon />
          </Badge>
        </IconButton>
      </Button>

      <Button
        sx={{ padding: 0 }}
        color="inherit"
        fullWidth
      >
        <IconButton disableRipple>
          <GroupsIcon />
        </IconButton>
      </Button>

      <Button
        sx={{ padding: 0 }}
        color="inherit"
        fullWidth
      >
        <IconButton disableRipple>
          <SettingsIcon />
        </IconButton>
      </Button>
    </AppBar>
  )
}

export default NavBar
