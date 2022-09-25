import { useTranslation } from 'react-i18next'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box, Button, MobileStepper, useTheme,
} from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'

import DietsSelector from '../components/DietsSelector'
import IngredientsSelector from '../components/IngredientsSelector'

const useSteps = (filters, setFilters) => ([
  {
    stepContent: <DietsSelector filters={filters} setFilters={setFilters} />,
  },
  {
    stepContent: <IngredientsSelector filters={filters} setFilters={setFilters} />,
  },
])

function FiltersWizardPage({ filters, setFilters }) {
  const navigate = useNavigate()
  const theme = useTheme()
  const steps = useSteps(filters, setFilters)

  const { t } = useTranslation()

  const [activeStep, setActiveStep] = React.useState(0)
  const maxSteps = steps.length

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    if (activeStep === maxSteps - 1) navigate('../dishes')
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1, padding: theme.spacing(2) }}>
        {steps[activeStep].stepContent}
      </Box>
      <MobileStepper
        variant="text"
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
    </Box>
  )
}

export default FiltersWizardPage
