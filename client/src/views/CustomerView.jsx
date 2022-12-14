import React from 'react'
import OverviewIcon from '@mui/icons-material/Dashboard'
import DishesIcon from '@mui/icons-material/RestaurantMenu'
import MenusIcon from '@mui/icons-material/MenuBook'
import InfoIcon from '@mui/icons-material/InfoOutlined'
import KitchenSelector from 'components/KitchenSelector'
import KitchenProvider from 'contexts/kitchen'
import ViewWrapper from './ViewWrapper'
import { useTranslation } from 'react-i18next'

const CustomerView = () => {
  const { t } = useTranslation()
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

  return (
    <ViewWrapper drawerTabs={drawerTabs} appBarContent={<KitchenSelector />} />
  )
}

export default function WrappedCustomerView() {
  return (
    <KitchenProvider>
      <CustomerView />
    </KitchenProvider>
  )
}
