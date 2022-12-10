import React from 'react'

import { BsBasket as IngredientsIcon } from 'react-icons/bs'
import PersonIcon from '@mui/icons-material/Person'
import QuestionMarkIcon from '@mui/icons-material/QuestionMark'
import ViewWrapper from 'views/ViewWrapper'

import { t } from 'i18next'

const drawerTabs = [
  {
    name: t('tabs.admin.customers'),
    route: '/admin/customers',
    icon: <PersonIcon />,
  },
  {
    name: t('tabs.admin.ingredients'),
    route: '/admin/ingredients',
    icon: <IngredientsIcon />,
  },
  {
    name: t('tabs.admin.foodGroups'),
    route: '/admin/foodGroups',
    icon: <QuestionMarkIcon />,
  },
  {
    name: t('tabs.admin.diets'),
    route: '/admin/diets',
    icon: <QuestionMarkIcon />,
  },
]

const AdminView = () => <ViewWrapper drawerTabs={drawerTabs} />

export default AdminView
