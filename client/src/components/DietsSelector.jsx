import { t } from 'i18next'
import React from 'react'
import update from 'immutability-helper'

import { useDiets } from '../hooks/diets'
import MainBtn from './MainBtn'

function DietsSelector({ filters, setFilters }) {
  const { diets, isLoading } = useDiets()

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

  if (isLoading) return <div>LOADING</div>

  return (
    <div>
      <h1 className="text-center text-4xl font-bold mb-2">{t('my_diet')}</h1>
      <h2 className="text-center text-2xl text-gray-300">{t('choose_relevant_options')}</h2>

      <div className="flex flex-col w-1/2 mx-auto m-auto mt-4">
        {diets.map((diet) => (
          <MainBtn
            key={diet.id}
            label={t(diet.name.toLocaleLowerCase())}
            selected={filters.diets.includes(diet.id)}
            onClick={handleClickDiet(diet.id)}
          />
        ))}
      </div>
    </div>
  )
}

export default DietsSelector
