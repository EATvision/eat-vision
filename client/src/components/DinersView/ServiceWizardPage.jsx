import React from 'react'
import { Box } from '@mui/material'

import WaiterBanner from './WaiterBanner'
import Login from 'components/Login'
import { t } from 'i18next'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useDinerUser } from 'contexts/diner'
import OptOutLoginOption from './OptOutLoginOption'

function ServiceWizardPage() {
  const navigate = useNavigate()
  const { kitchenId, menuId } = useParams()
  const dinerUser = useDinerUser()

  const handleDoneLogin = async () => {
    navigate(`/diners/kitchens/${kitchenId}/menus/${menuId}/dishes`)
  }

  const handleBack = () => {
    navigate(-1)
  }

  const SERVICE_OPTIONS = {
    login: {
      waiterTitle: t('login_plea'),
      waiterSubTitle: t('login_plea_subtext'),
      component: (
        <Login
          onDone={handleDoneLogin}
          optOutLoginOption={<OptOutLoginOption onDone={handleDoneLogin} />}
          onBack={handleBack}
        />
      ),
    },
  }

  const chosenOption = 'login'

  // TODO: Remove once service page has more than the login step
  if (dinerUser.token) {
    return (
      <Navigate
        to={`/diners/kitchens/${kitchenId}/menus/${menuId}/dishes`}
        replace
      />
    )
  }

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
