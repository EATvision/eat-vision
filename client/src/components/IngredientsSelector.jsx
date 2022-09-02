import { t } from 'i18next'
import React from 'react'

function DietsSelector({ filters, setFilters }) {
  return (
    <div>
      <h1 className="text-center text-4xl font-bold mb-2">{t('my_diet')}</h1>
      <h2 className="text-center text-2xl text-gray-300">{t('choose_relevant_options')}</h2>

      <div className="flex flex-col w-1/2 mx-auto m-auto mt-4">
        SELECTOR HERE
      </div>
    </div>
  )
}

export default DietsSelector
