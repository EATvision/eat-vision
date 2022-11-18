import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import useSteps from './FiltersForm/useSteps'
import FiltersStepper from './FiltersForm/FiltersStepper'
import WaiterBanner from './WaiterBanner'

function FiltersWizardPage({ filters, setFilters, dishes }) {
  const { step } = useParams()
  const navigate = useNavigate()
  const steps = useSteps(filters, setFilters)
  const maxSteps = steps.length

  const handleNext = () => {
    const nextStep = Number(step) + 1
    if (nextStep === maxSteps) return navigate('../service')
    return navigate(`../filters/${nextStep}`)
  }

  const handleBack = () => {
    const prevStep = Number(step) - 1
    if (prevStep === 0) return navigate('../')
    return navigate(`../filters/${prevStep}`)
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
        title={steps[Number(step)].title}
        subtitle={steps[Number(step)].subtitle}
      />

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          overflow: 'auto',
        }}
      >
        {steps[Number(step)].stepContent({
          onNext: handleNext,
          onBack: handleBack,
        })}
      </Box>

      <FiltersStepper
        filters={filters}
        dishes={dishes}
        onNext={handleNext}
        onBack={handleBack}
      />
    </Box>
  )
}

export default FiltersWizardPage
