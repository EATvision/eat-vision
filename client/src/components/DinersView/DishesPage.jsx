import React from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Box, Paper, Typography, useTheme } from '@mui/material'

import { useKitchenCategoriesByMenu } from 'hooks/kitchens'

import FoodDish from './DishCard/FoodDish'
import Footer from './Footer'

function DishesPage({ dishes }) {
  const theme = useTheme()
  const { kitchenId, menuId } = useParams()
  const { t } = useTranslation()

  const [showFilteredOutDishes] = React.useState(false)

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

  if (isLoading) return <div>LOADING</div>

  return (
    <>
      {' '}
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
                  maxWidth: 750,
                  margin: 'auto',
                }}
              >
                <Paper
                  elevation={2}
                  square
                  sx={{
                    backgroundColor: '#E9E9E9',
                    margin: theme.spacing(2),
                    padding: theme.spacing(2),
                    width: '100%',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    textAlign: 'initial',
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      fontSize: 22,
                      textAlign: 'initial',
                      width: '100%',
                    }}
                  >
                    {category?.name}
                  </Typography>
                  {category.description && <Box>{category.description}</Box>}
                </Paper>

                <Box
                  sx={{
                    width: '100%',
                    padding: `0 ${theme.spacing(2)}`,
                  }}
                >
                  {orderedDishesByCategoryId?.[category.id]?.map((dish) => (
                    <FoodDish key={dish.id} data={dish} />
                  ))}
                </Box>
              </Box>
            </div>
          ))}
      </Box>
      {dishes?.total?.length > 0 && <Footer dishes={dishes} />}
    </>
  )
}

export default DishesPage
