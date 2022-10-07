import React from 'react'
import DietsStep from './DietsStep'
import FoodRestrictionsStep from './FoodRestrictionsStep'

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

export default useSteps
