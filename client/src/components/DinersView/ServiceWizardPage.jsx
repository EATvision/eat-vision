import React from 'react'
import { Box } from '@mui/material'

import WaiterBanner from './WaiterBanner'
import Login from 'components/Login'
import { t } from 'i18next'

function ServiceWizardPage({ filters }) {
  const SERVICE_OPTIONS = {
    login: {
      waiterTitle: t('login_plea'),
      waiterSubTitle: t('login_plea_subtext'),
      component: <Login filters={filters} />,
    },
  }

  const chosenOption = 'login'

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        width: '100%',
        maxWidth: 500,
        margin: 'auto',
      }}
    >
      <WaiterBanner
        title={SERVICE_OPTIONS[chosenOption].waiterTitle}
        subtitle={SERVICE_OPTIONS[chosenOption].waiterSubTitle}
      />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          overflow: 'auto',
        }}
      >
        {SERVICE_OPTIONS[chosenOption].component}
      </Box>
    </Box>
  )
}

export default ServiceWizardPage
