import React from 'react'
import { t } from 'i18next'
import { Badge, IconButton, Typography } from '@mui/material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { useDinerUser } from 'contexts/diner'
import { ProfileIcon } from 'components/Icons/ProfileIcon'

export default function UserFiltersBtn() {
  const location = useLocation()
  const navigate = useNavigate()
  const { kitchenId, menuId } = useParams()

  const dinerUser = useDinerUser()
  const numberOfFiltersOn = Object.keys(dinerUser.user.filters).reduce(
    (acc, filterName) => acc + dinerUser.user.filters[filterName].length,
    0
  )

  const handleClickFilters = () => {
    if (kitchenId && menuId) {
      navigate(`/diners/kitchens/${kitchenId}/menus/${menuId}/filters/1`)
    } else {
      navigate(-1)
    }
  }

  return (
    <IconButton
      disabled={location.pathname.includes('/filters')}
      onClick={handleClickFilters}
    >
      <Badge
        color="primary"
        invisible={numberOfFiltersOn === 0}
        badgeContent={numberOfFiltersOn}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <ProfileIcon />
        <Typography sx={{ fontSize: 12 }}>{t('profile')}</Typography>
      </Badge>
    </IconButton>
  )
}
