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
import OverviewIcon from '@mui/icons-material/Dashboard'
import DishesIcon from '@mui/icons-material/RestaurantMenu'
import MenusIcon from '@mui/icons-material/MenuBook'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import { Button, Typography } from '@mui/material'
import KitchenSelector from '../components/KitchenSelector'
import KitchenProvider from '../contexts/kitchen'
import RTL from '../components/RTL'
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

function CustomersView() {
  const theme = useTheme()
  const navigate = useNavigate()
  const isRTL = useIsRTL()

  // TODO: implement customer auth
  const token = true

  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const handleClickLogout = () => {
    navigate('/customers')
  }

  return (
    <KitchenProvider>
      <ThemeProvider theme={getTheme(isRTL)}>
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
          <AppBar position="fixed" open={open}>
            <Toolbar>
              {token && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                    marginRight: 5,
                    ...(open && { display: 'none' }),
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
                {token && <KitchenSelector />}
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

          {token && (
            <Drawer variant="permanent" open={open}>
              <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                  {isRTL ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                </IconButton>
              </DrawerHeader>
              <Divider />
              <List>
                <ItemList
                  open={open}
                  tabName="overview"
                  icon={<OverviewIcon />}
                />

                <ItemList
                  open={open}
                  tabName="generalInfo"
                  icon={<InfoIcon />}
                />

                <ItemList open={open} tabName="dishes" icon={<DishesIcon />} />

                <ItemList open={open} tabName="menus" icon={<MenusIcon />} />
              </List>
            </Drawer>
          )}

          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />

            <Outlet />
          </Box>
        </Box>
      </ThemeProvider>
    </KitchenProvider>
  )
}

function ItemList({ open, tabName, icon }) {
  const navigate = useNavigate()
  const location = useLocation()

  const selectedTab = location?.pathname?.split('/')?.[2]

  const handleClick = () => navigate(`/customers/${tabName}`)

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

function WrappedCustomersView(props) {
  const isRTL = useIsRTL()

  return isRTL ? (
    <RTL>
      <CustomersView {...props} />
    </RTL>
  ) : (
    <CustomersView {...props} />
  )
}

export default WrappedCustomersView
