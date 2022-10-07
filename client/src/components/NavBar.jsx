import React from 'react'
import {
  AppBar, Button,
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import TuneIcon from '@mui/icons-material/Tune'
import GroupsIcon from '@mui/icons-material/Groups'

function NavBar() {
  const handleClickFilters = () => {
  }
  return (
    <AppBar position="fixed" color="default" sx={{ display: 'flex', flexDirection: 'row' }}>
      <Button
        fullWidth
        onClick={handleClickFilters}
      >
        <TuneIcon />
      </Button>

      <Button fullWidth>
        <GroupsIcon />
      </Button>

      <Button fullWidth>
        <SettingsIcon />
      </Button>
    </AppBar>
  )
}

export default NavBar
