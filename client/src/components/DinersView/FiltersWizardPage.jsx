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
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
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
        {steps[Number(step)].stepContent}
      </Box>

      <Box>
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
      </Box>

    </Box>
  )
}

export default FiltersWizardPage
