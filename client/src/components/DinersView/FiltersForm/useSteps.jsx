import { t } from 'i18next'
import React from 'react'
import DietsStep from './DietsStep'
import FoodRestrictionsStep from './FoodRestrictionsStep'

const useSteps = (filters, setFilters) => {
  const isUserLoggedIn = true
  return ([
    {
      stepContent: <div />,
    },
    !isUserLoggedIn && {

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
  ].filter(Boolean))
}

export default useSteps
