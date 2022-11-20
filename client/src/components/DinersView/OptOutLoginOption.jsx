import React from 'react'
import { Typography, useTheme } from '@mui/material'
import { Link, useParams } from 'react-router-dom'
import { t } from 'i18next'
import { useDinerUser } from 'contexts/diner'

export default function OptOutLoginOption({ onDone }) {
  const theme = useTheme()
  const { kitchenId, menuId } = useParams()

  const handleClickOptOutLogin = async () => {
    await dinerUser.updateToken(null)
    await dinerUser.signup(null)
    await onDone()
  }

  return (
    <Typography
      variant="body2"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        opacity: 0.8,
        marginTop: theme.spacing(2),
      }}
    >
      {t('or_skip_to_the')}
      <Link
        className="group flex flex-col"
        to={`/diners/kitchens/${kitchenId}/menus/${menuId}/dishes`}
        onClick={handleClickOptOutLogin}
      >
        <Typography
          variant="body2"
          sx={{
            margin: `0 ${theme.spacing(1)}`,
            textDecoration: 'underline',
          }}
        >
          {t('no_login')}
        </Typography>
      </Link>
    </Typography>
  )
}
