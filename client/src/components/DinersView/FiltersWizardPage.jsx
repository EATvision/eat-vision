import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box } from '@mui/material'

import useSteps from './FiltersForm/useSteps'
import WaiterBanner from './WaiterBanner'
import { useDinerUser } from 'contexts/diner'

function FiltersWizardPage() {
  const { step } = useParams()
  const navigate = useNavigate()
  const steps = useSteps()
  const dinerUser = useDinerUser()
  const maxSteps = steps.length

  const handleNext = async () => {
    const nextStep = Number(step) + 1
    if (nextStep === maxSteps) {
      await dinerUser.saveDiner()
      if (dinerUser.token) return navigate('../dishes') // TODO: Remove once service page has more than the login step
      return navigate('../service')
    }
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
    </Box>
  )
}

export default FiltersWizardPage
