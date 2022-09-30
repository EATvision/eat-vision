import React from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import useScrollSpy from 'react-use-scrollspy'

import { Box, Typography, useTheme } from '@mui/material'
import { useKitchenCategoriesByMenu } from '../hooks/kitchens'

import Dish from '../components/DishCard/Dish'

function DishesPage({ dishes }) {
  const theme = useTheme()
  const { kitchenId, menuId } = useParams()
  const { t } = useTranslation()
  const [showFilteredOutDishes] = React.useState(false)

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
      if (!showFilteredOutDishes && d.isMainDishFilteredOut) return result
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
            <div
              className="container mx-auto flex flex-col justify-center items-center gap-2"
              key={category.id}
              id={category.id}
              ref={sectionRefs[index]}
            >

              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: `0 ${theme.spacing(1)}`,
                  maxWidth: 750,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 'bold', padding: theme.spacing(4), paddingBottom: theme.spacing(0), textAlign: 'initial', width: '100%',
                  }}
                >
                  {category?.name}
                </Typography>
                {
                orderedDishesByCategoryId?.[category.id]?.map((dish) => (
                  <Dish key={dish.id} data={dish} />
                ))
                }
              </Box>
            </div>
          ))
        }
      </div>

    </div>
  )
}

export default DishesPage
