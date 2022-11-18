import { useTranslation } from 'react-i18next'
import React from 'react'
import { useParams } from 'react-router-dom'
import { Button, MobileStepper } from '@mui/material'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import useSteps from './useSteps'
import { useKitchenById } from '../../../hooks/kitchens'

function FiltersStepper({ filters, setFilters, onNext, onBack }) {
  const { step } = useParams()
  const { kitchenId } = useParams()
  const { kitchen } = useKitchenById(kitchenId)
  const steps = useSteps(filters, setFilters)

  const { t } = useTranslation()

  const maxSteps = steps.length

  return (
    <MobileStepper
      variant="progress"
      steps={maxSteps}
      position="static"
      activeStep={Number(step)}
      sx={{ marginTop: 'auto', position: 'relative' }}
      nextButton={
        <Button size="small" onClick={onNext}>
          {t(Number(step) === maxSteps - 1 ? 'done' : 'next')}
          {kitchen.locale === 'he-IL' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={onBack} disabled={Number(step) === 0}>
          {kitchen.locale === 'he-IL' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          {t('back')}
        </Button>
      }
    />
  )
}

export default FiltersStepper
