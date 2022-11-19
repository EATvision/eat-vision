import React from 'react'
import OverviewIcon from '@mui/icons-material/Dashboard'
import DishesIcon from '@mui/icons-material/RestaurantMenu'
import MenusIcon from '@mui/icons-material/MenuBook'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import KitchenProvider from '../contexts/kitchen'
import { t } from 'i18next'
import ViewWrapper from './ViewWrapper'

const drawerTabs = [
  {
    name: t('tabs.customers.overview'),
    route: '/customers/overview',
    icon: <OverviewIcon />,
  },
  {
    name: t('tabs.customers.generalInfo'),
    route: '/customers/generalInfo',
    icon: <InfoIcon />,
  },
  {
    name: t('tabs.customers.dishes'),
    route: '/customers/dishes',
    icon: <DishesIcon />,
  },
  {
    name: t('tabs.customers.menus'),
    route: '/customers/menus',
    icon: <MenusIcon />,
  },
]

const CustomerView = () => (
  <KitchenProvider>
    <ViewWrapper drawerTabs={drawerTabs} />
  </KitchenProvider>
)

export default CustomerView
