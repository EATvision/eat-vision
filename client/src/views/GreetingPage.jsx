import React from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  Button, Box, Typography, useTheme,
} from '@mui/material'

import { defaultFilters } from '../utils/filters'
import { postDiner } from '../api/diners'

function GreetingPage({ setFilters }) {
  const theme = useTheme()
  const { t } = useTranslation()

  const handleClickSkipToFullMenu = async () => {
    setFilters(defaultFilters)
    await postDiner(defaultFilters)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box>
        <Typography variant="h4" sx={{ margin: theme.spacing(3) }}>
          {t('hi_im_your_personal_waiter')}
        </Typography>

        <Typography variant="h5" sx={{ margin: theme.spacing(3) }}>
          {t('let_me_help_you')}
        </Typography>
      </Box>
      <Box sx={{ margin: theme.spacing(2), marginTop: 'auto' }}>
        <Link
          className="group flex flex-col"
          to="filters"
        >
          <Button variant="contained" color="primary">{t('lets_get_started')}</Button>
        </Link>

        <Link
          className="group flex flex-col"
          to="dishes"
          onClick={handleClickSkipToFullMenu}
        >
          <Button variant="text">{t('skip_to_full_menu')}</Button>
        </Link>
      </Box>
    </Box>
  )
}

export default GreetingPage
