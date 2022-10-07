import React from 'react'
import { useParams } from 'react-router-dom'
import {
  Box,
} from '@mui/material'

import MenuOptionsBanner from '../components/MenuOptionsBanner'
import useSteps from '../components/FiltersForm/useSteps'
import FiltersStepper from '../components/FiltersForm/FiltersStepper'

function FiltersWizardPage({ filters, setFilters, dishes }) {
  const { step } = useParams()
  const steps = useSteps(filters, setFilters)

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flexGrow: 1 }}>
        {steps[Number(step)].stepContent}
      </Box>

      <FiltersStepper filters={filters} dishes={dishes} />

      {
        dishes?.total?.length > 0
        && <MenuOptionsBanner filters={filters} dishes={dishes} />
      }
    </Box>
  )
}

export default FiltersWizardPage
