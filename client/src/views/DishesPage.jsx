import React from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useScrollSpy from 'react-use-scrollspy'

import { useKitchenCategoriesByMenu } from '../hooks/kitchens'

import Dish from '../components/Dish'

function DishesPage({ dishes }) {
  const { kitchenId, menuId } = useParams()
  const { t } = useTranslation()

  const sectionRefs = [
    React.useRef(null), React.useRef(null), React.useRef(null), React.useRef(null),
    React.useRef(null), React.useRef(null), React.useRef(null), React.useRef(null),
    React.useRef(null), React.useRef(null), React.useRef(null), React.useRef(null),
    React.useRef(null), React.useRef(null), React.useRef(null), React.useRef(null),
    React.useRef(null), React.useRef(null), React.useRef(null), React.useRef(null),
    React.useRef(null), React.useRef(null), React.useRef(null), React.useRef(null),
    React.useRef(null), React.useRef(null), React.useRef(null),
  ]
  const { categories, isLoading } = useKitchenCategoriesByMenu(kitchenId, menuId)

  const activeSection = useScrollSpy({
    sectionElementRefs: sectionRefs,
    offsetPx: -80,
  })

  const defaultCategories = categories?.reduce((result, c) => ({
    ...result,
    [c.id]: [],
  }), {}) || {}

  const orderedCategories = [...Object.values(categories || {}).sort((a, b) => a.position - b.position), { id: 'no_category', name: t('other') }]

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

      <div className="sticky-top text-sm">
        <ul className="nav menu-sidebar bg-black text-white overflow-auto whitespace-nowrap">
          {
            orderedCategories.map((category, index) => (
              <li key={category.id} className="py-2 mx-1 inline-block">
                <a className={`nav-link ${activeSection === index ? 'font-bold' : ''}`} href={`#${category.id}`}>{category.name}</a>
              </li>
            ))
          }
        </ul>
      </div>

      <div className="container relative overflow-auto mx-auto">
        {
          orderedCategories?.map((category, index) => (
            <div className="container mx-auto" key={category.id} id={category.id} ref={sectionRefs[index]}>
              <h2>{category?.name}</h2>
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

export default DishesPage
