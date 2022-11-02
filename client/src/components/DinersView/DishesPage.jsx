import React from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import {
  Box, Tab, Tabs, Typography, useTheme,
} from '@mui/material'
import { useKitchenCategoriesByMenu } from '../../hooks/kitchens'

import Dish from './DishCard/Dish'
import MenuOptionsBanner from './MenuOptionsBanner'

function DishesPage({ dishes, filters }) {
  const theme = useTheme()
  const { kitchenId, menuId } = useParams()
  const { t } = useTranslation()

  const [showFilteredOutDishes] = React.useState(false)
  const [currentCategory, setCurrentCategory] = React.useState(0)

  const { categories, isLoading } = useKitchenCategoriesByMenu(kitchenId, menuId)

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

  const handleChangeCategory = (event, newValue) => {
    setCurrentCategory(newValue)
  }

  if (isLoading) return <div>LOADING</div>

  return (
    <>
      <div className="top-0 sticky text-sm z-10">
        <Tabs
          value={currentCategory}
          onChange={handleChangeCategory}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          sx={{ backgroundColor: theme.palette.primary.light, color: theme.palette.common.white }}
          indicatorColor="secondary"
          textColor="secondary"
          visibleScrollbar
        >
          {
            orderedCategories.map((category, index) => (
              <Tab
                key={category.id}
                label={category.name}
                href={`#${category.id}`}
              >
                {category.name}
              </Tab>
            ))
          }
        </Tabs>
      </div>

      <div className="container relative overflow-auto mx-auto">
        {
          orderedCategories?.map((category, index) => (
            <div
              className="container mx-auto flex flex-col justify-center items-start gap-2"
              key={category.id}
              id={category.id}
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
                  sx={{
                    backgroundColor: '#E9E9E9',
                    margin: theme.spacing(2),
                    padding: theme.spacing(1),
                    fontWeight: 'bold',
                    fontSize: 22,
                    textAlign: 'initial',
                    width: '100%',
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

      {
          dishes?.total?.length > 0
          && (
          <MenuOptionsBanner
            filters={filters}
            dishes={dishes}
            showWaiterBtn
          />
          )
        }

    </>
  )
}

export default DishesPage
