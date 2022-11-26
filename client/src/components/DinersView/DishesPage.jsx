import React from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Box, Paper, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { useKitchenCategoriesByMenu } from '../../hooks/kitchens'

import FoodDish from './DishCard/FoodDish'
import DrinkDish from './DishCard/DrinkDish'

import Footer from './Footer'

function DishesPage({ dishes }) {
  const theme = useTheme()
  const { kitchenId, menuId } = useParams()
  const { t } = useTranslation()

  const [showFilteredOutDishes] = React.useState(false)
  const [currentCategory, setCurrentCategory] = React.useState(0)

  const { categories, isLoading } = useKitchenCategoriesByMenu(
    kitchenId,
    menuId
  )

  const defaultCategories = React.useMemo(
    () =>
      categories?.reduce(
        (result, c) => ({
          ...result,
          [c.id]: [],
        }),
        {}
      ) || {},
    [categories]
  )

  const orderedCategories = [
    ...Object.values(categories || {}).sort((a, b) => a.position - b.position),
    { id: 'no_category', name: t('other') },
  ]

  const orderedDishesByCategoryId = React.useMemo(
    () =>
      categories
        ? dishes.filtered.reduce((result, d) => {
          if (!showFilteredOutDishes && d.isMainDishFilteredOut) return result
          const categoryId = d?.categories?.[0] || 'no_category'
          return {
            ...result,
            [categoryId]: [...(result[categoryId] || []), d],
          }
        }, defaultCategories)
        : {},
    [categories, dishes.filtered, defaultCategories, showFilteredOutDishes]
  )

  const handleChangeCategory = (event, newValue) => {
    setCurrentCategory(newValue)
  }

  if (isLoading) return <div>LOADING</div>

  return (
    <>
      <div className="top-0 sticky text-sm z-10">
        <Paper elevation={2}>
          <Tabs
            value={currentCategory}
            onChange={handleChangeCategory}
            variant="scrollable"
            scrollButtons
            allowScrollButtonsMobile
            indicatorColor="primary"
            textColor="primary"
          >
            {orderedCategories
              .filter((c) => orderedDishesByCategoryId?.[c.id]?.length > 0)
              .map((category) => (
                <Tab
                  key={category.id}
                  label={category.name}
                  href={`#${category.id}`}
                />
              ))}
          </Tabs>
        </Paper>
      </div>

      <Box sx={{ overflow: 'auto' }}>
        {orderedCategories
          ?.filter((c) => orderedDishesByCategoryId?.[c.id]?.length > 0)
          .map((category) => (
            <div
              className="mx-auto flex flex-col justify-center items-start gap-2"
              key={category.id}
              id={category.id}
            >
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: `0 ${theme.spacing(2)}`,
                  maxWidth: 750,
                  margin: 'auto',
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
                {orderedDishesByCategoryId?.[category.id]?.map((dish) =>
                  dish.dishType === 'drink' ? (
                    <DrinkDish key={dish.id} data={dish} />
                  ) : (
                    <FoodDish key={dish.id} data={dish} />
                  )
                )}
              </Box>
            </div>
          ))}
      </Box>

      {dishes?.total?.length > 0 && <Footer dishes={dishes} />}
    </>
  )
}

export default DishesPage
