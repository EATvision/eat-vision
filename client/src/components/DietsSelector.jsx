import { t } from 'i18next'
import React from 'react'
import update from 'immutability-helper'

import { diets } from '../utils/filters'
import MainBtn from './MainBtn'

function DietsSelector({ filters, setFilters }) {
  const handleClickDiet = (diet) => () => {
    if (filters.diets.includes(diet)) {
      setFilters((currFilters) => update(currFilters, {
        diets: { $splice: [[currFilters.diets.indexOf(diet), 1]] },
      }))
    } else {
      setFilters((currFilters) => {
        const a = update(currFilters, {
          diets: { $push: [diet] },
        })
        return a
      })
    }
  }

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mb-2">{t('my_diet')}</h1>
      <h2 className="text-center text-2xl text-gray-300">{t('choose_relevant_options')}</h2>

      <div className="flex flex-col w-1/2 mx-auto m-auto mt-4">
        {diets.map((diet) => (
          <MainBtn
            key={diet}
            label={t(diet.toLocaleLowerCase())}
            selected={filters.diets.includes(diet)}
            onClick={handleClickDiet(diet)}
          />
        ))}
      </div>
    </div>
  )
}

export default DietsSelector
