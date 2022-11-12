import { useTranslation } from 'react-i18next'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Button, MobileStepper, useTheme,
} from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import useSteps from './useSteps'

function FiltersStepper({ filters, setFilters }) {
  const theme = useTheme()
  const { step } = useParams()
  const navigate = useNavigate()
  const steps = useSteps(filters, setFilters)

  const { t } = useTranslation()

  const maxSteps = steps.length

  const handleNext = () => {
    const nextStep = Number(step) + 1
    if (nextStep === maxSteps) return navigate('../dishes')
    return navigate(`../filters/${nextStep}`)
  }

  const handleBack = () => {
    const prevStep = Number(step) - 1
    if (prevStep === 0) return navigate('../')
    return navigate(`../filters/${prevStep}`)
  }

  return (
    <MobileStepper
      variant="progress"
      steps={maxSteps}
      position="static"
      activeStep={Number(step)}
      sx={{ marginTop: 'auto', position: 'relative' }}
      nextButton={(
        <Button
          size="small"
          onClick={handleNext}
        >
          {t(Number(step) === maxSteps - 1 ? 'done' : 'next')}
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
        )}
      backButton={(
        <Button
          size="small"
          onClick={handleBack}
          disabled={Number(step) === 0}
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          {t('back')}
        </Button>
        )}
    />

  )
}

export default FiltersStepper
