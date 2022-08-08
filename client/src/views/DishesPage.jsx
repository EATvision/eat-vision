import React from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useRestaurantDishesCategories } from '../hooks/restaurants'

import Dish from '../components/Dish'

function FilteredMenuPage({ dishes }) {
  const { restaurantId } = useParams()
  const { t } = useTranslation()

  const { categories, isLoading } = useRestaurantDishesCategories(restaurantId)

  const defaultCategories = Object.keys(categories || {}).reduce((result, c) => ({
    ...result,
    [c]: [],
  }), {})

  const orderedCategories = [...Object.values(categories || {}).sort((a, b) => a.position - b.position), { id: 'no_category', display_name: t('other') }]

  const orderedDishesByCategoryId = React.useMemo(
    () => (categories ? dishes.filtered.reduce((result, d) => {
      const categoryId = d?.categories?.[0] || 'no_category'
      return ({
        ...result,
        [categoryId]: [...(result[categoryId] || []), d],
      })
    }, defaultCategories) : {}),
    [dishes, categories],
  )

  if (isLoading) return <div>LOADING</div>

  return (
    <div>

      <h2>
        FILTERED MENU
      </h2>

      <div>
        {
          orderedCategories.map((category) => (
            <a href={`#${category.id}`}>{category.display_name}</a>
          ))
        }
      </div>

      <div className="container">
        {
          orderedCategories?.map((category) => (
            <div key={category.id} id={category.id}>
              <h2>{category?.display_name}</h2>
              {
                orderedDishesByCategoryId?.[category.id]?.map((dish) => (
                  <Dish key={dish.id} data={dish} />
                ))
              }
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default FilteredMenuPage
