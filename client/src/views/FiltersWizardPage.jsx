import { useTranslation } from 'react-i18next'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Button, MobileStepper, useTheme,
} from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

import DietsStep from '../components/FiltersForm/DietsStep'
import FoodRestrictionsStep from '../components/FiltersForm/FoodRestrictionsStep'
import MenuOptionsBanner from '../components/MenuOptionsBanner'

const useSteps = (filters, setFilters) => ([
  {
    stepContent: <div />,
  },
  {
    stepContent: <DietsStep filters={filters} setFilters={setFilters} />,
  },
  {
    stepContent: <FoodRestrictionsStep filters={filters} setFilters={setFilters} />,
  },
])

function FiltersWizardPage({ filters, setFilters, dishes }) {
  const navigate = useNavigate()
  const theme = useTheme()
  const steps = useSteps(filters, setFilters)

  const { t } = useTranslation()

  const [activeStep, setActiveStep] = React.useState(1)
  const maxSteps = steps.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    if (activeStep === maxSteps - 1) navigate('../dishes')
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      const updatedStep = prevActiveStep - 1
      if (updatedStep === 0) navigate('../')
      return updatedStep
    })
  }

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1 }}>
        {steps[activeStep].stepContent}
      </Box>
      <MobileStepper
        variant="progress"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={(
          <Button
            size="small"
            onClick={handleNext}
          >
            {t(activeStep === maxSteps - 1 ? 'done' : 'next')}
            {theme.direction === 'rtl' ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        )}
        backButton={(
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            {t('back')}
          </Button>
        )}
      />
      <MenuOptionsBanner filters={filters} dishes={dishes} />
    </Box>
  )
}

export default FiltersWizardPage
