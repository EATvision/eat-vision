import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  AppBar, Button,
} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import TuneIcon from '@mui/icons-material/Tune'
import GroupsIcon from '@mui/icons-material/Groups'

function NavBar() {
  const navigate = useNavigate()
  const location = useLocation()

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
