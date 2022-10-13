import { t } from 'i18next'
import React from 'react'
import DietsStep from './DietsStep'
import FoodRestrictionsStep from './FoodRestrictionsStep'

const useSteps = (filters, setFilters) => ([
  {
    stepContent: <div />,
  },
  {
    title: t('do_you_have_a_specific_diet'),
    subtitle: t('choose_relevant_options'),
    stepContent: <DietsStep filters={filters} setFilters={setFilters} />,
  },
  {
    title: t('any_restrictions'),
    subtitle: t('choose_relevant_options'),
    stepContent: <FoodRestrictionsStep filters={filters} setFilters={setFilters} />,
  },
])

export default useSteps
