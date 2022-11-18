import { t } from 'i18next'
import React from 'react'
import DietsStep from './DietsStep'
import FoodRestrictionsStep from './FoodRestrictionsStep'

const useSteps = (filters, setFilters) => {
  return [
    {
      stepContent: <div />,
    },
    {
      title: t('do_you_have_a_specific_diet'),
      subtitle: t('choose_relevant_options'),
      stepContent: (props) => (
        <DietsStep filters={filters} setFilters={setFilters} {...props} />
      ),
    },
    {
      title: t('any_restrictions'),
      subtitle: t('choose_relevant_options'),
      stepContent: (props) => (
        <FoodRestrictionsStep
          filters={filters}
          setFilters={setFilters}
          {...props}
        />
      ),
    },
  ].filter(Boolean)
}

export default useSteps
