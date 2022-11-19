import React from 'react'

import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { styled, ThemeProvider, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MuiDrawer from '@mui/material/Drawer'
import MuiAppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import { Button, Typography } from '@mui/material'

import { clearTokenData, getToken } from '../utils/token'
import RTL from 'components/RTL'
import getTheme from '../theme'
import useIsRTL from '../hooks/useRTL'
import { t } from 'i18next'

const drawerWidth = 240

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}))

const ItemList = ({ open, tabName, tabRoute, icon }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedTab = location?.pathname?.split('/')?.[2]

  const handleClick = () => navigate(tabRoute)

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
        selected={selectedTab === tabName}
        onClick={handleClick}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={tabName} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  )
}

const CustomAppBar = ({
  isDrawerOpen,
  handleDrawerOpen,
  handleClickLogout,
}) => {
  const token = getToken()
  const theme = useTheme()

  return (
    <AppBar position="fixed" open={isDrawerOpen}>
      <Toolbar>
        {token && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(isDrawerOpen && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
          {!token && (
            <Typography sx={{ marginRight: theme.spacing(2) }}>
              Customers Page
            </Typography>
          )}
        </Box>

        {token && (
          <Button
            variant="text"
            sx={{ color: theme.palette.common.white }}
            onClick={handleClickLogout}
          >
            {t('logout')}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
}

const CustomDrawer = ({ isDrawerOpen, drawerTabs, handleDrawerClose }) => {
  const token = getToken()
  const isRTL = useIsRTL()

  if (!token) return null

  return (
    <Drawer variant="permanent" open={isDrawerOpen}>
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {isRTL ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {drawerTabs.map((tab, index) => (
          <ItemList
            open={isDrawerOpen}
            key={tab.name + index}
            tabName={tab.name}
            tabRoute={tab.route}
            icon={tab.icon}
          />
        ))}
      </List>
    </Drawer>
  )
}

const ViewPicker = ({ drawerTabs = [] }) => {
  const navigate = useNavigate()

  const isRTL = useIsRTL()

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setIsDrawerOpen(false)
  }

  const handleClickLogout = () => {
    clearTokenData()
    navigate('/customers') //TODO add route
  }

  return (
    <ThemeProvider theme={getTheme(isRTL)}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <CustomAppBar
          isDrawerOpen={isDrawerOpen}
          handleDrawerOpen={handleDrawerOpen}
          handleClickLogout={handleClickLogout}
        />

        <CustomDrawer
          drawerTabs={drawerTabs}
          isDrawerOpen={isDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        />

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <DrawerHeader />
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  )
}

const ViewWrapper = (props) => {
  const isRTL = useIsRTL()

  if (!isRTL) return <ViewPicker {...props} />

  return (
    <RTL>
      <ViewPicker {...props} />
    </RTL>
  )
}

export default ViewWrapper
