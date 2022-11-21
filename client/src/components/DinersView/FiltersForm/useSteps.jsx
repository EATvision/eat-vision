import { t } from 'i18next'
import React from 'react'
import DietsStep from './DietsStep'
import FoodRestrictionsStep from './FoodRestrictionsStep'

const useSteps = () => {
  return [
    {
      stepContent: <div />,
    },
    {
      title: t('do_you_have_a_specific_diet'),
      subtitle: t('choose_relevant_options'),
      stepContent: (props) => <DietsStep {...props} />,
    },
    {
      title: t('any_restrictions'),
      subtitle: t('choose_relevant_options'),
      stepContent: (props) => <FoodRestrictionsStep {...props} />,
    },
  ].filter(Boolean)
}

export default useSteps
