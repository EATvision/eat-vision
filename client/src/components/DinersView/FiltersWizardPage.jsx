import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
} from '@mui/material'

import MenuOptionsBanner from './MenuOptionsBanner'
import useSteps from './FiltersForm/useSteps'
import FiltersStepper from './FiltersForm/FiltersStepper'
import WaiterBanner from './WaiterBanner'

function FiltersWizardPage({ filters, setFilters, dishes }) {
  const { step } = useParams()
  const steps = useSteps(filters, setFilters)

  return (
    <>
      <WaiterBanner
        title={steps[Number(step)].title}
        subtitle={steps[Number(step)].subtitle}
      />

      <Box sx={{ flexGrow: 1 }}>
        {steps[Number(step)].stepContent}
      </Box>

      <FiltersStepper filters={filters} dishes={dishes} />

      {
        dishes?.total?.length > 0
        && (
        <MenuOptionsBanner
          filters={filters}
          dishes={dishes}
        />
        )
      }
    </>
  )
}

export default FiltersWizardPage
