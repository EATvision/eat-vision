import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Badge,
  Box,
  Button,
  Grow,
  Paper,
  Typography,
  useTheme,
} from '@mui/material'

import { useKitchenCategoriesByMenu } from 'hooks/kitchens'

import FoodDish from './DishCard/FoodDish'
import DealBtn from './DealBtn'
import WaiterBanner from './WaiterBanner'
import FixedBottomConrainer from 'components/FixedBottomContainer'
import { useDinerOrder } from 'contexts/order'

function DishesPage({ dishes }) {
  const theme = useTheme()
  const navigate = useNavigate()
  const { kitchenId, menuId } = useParams()
  const { t } = useTranslation()

  const [showFilteredOutDishes] = React.useState(false)
  const dinerOrder = useDinerOrder()
  const numberOfDishesInMyOrder = dinerOrder?.order.length

  const { categories, isLoading } = useKitchenCategoriesByMenu(
    kitchenId,
    menuId
  )

  const handleClickBack = () => {
    navigate(-1)
  }

  const handleClickDone = () => {
    if (kitchenId && menuId) {
      navigate(`/diners/kitchens/${kitchenId}/menus/${menuId}/myorder`)
    } else {
      navigate(-1)
    }
  }

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
          let updatedResult = { ...result }
          d?.categories?.forEach((cId) => {
            updatedResult = {
              ...updatedResult,
              [cId]: [...(updatedResult[cId] || []), d],
            }
          })

          if (!d?.categories?.[0]) {
            updatedResult = {
              ...updatedResult,
              ['no_category']: [...(updatedResult['no_category'] || []), d],
            }
          }
          return updatedResult
        }, defaultCategories)
        : {},
    [categories, dishes.filtered, defaultCategories, showFilteredOutDishes]
  )

  if (isLoading) return <div>{t('loading')}</div>

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <WaiterBanner
        title={t('what_would_you_like')}
        subtitle={t('you_can_tag_all_that_seems_to_your_liking')}
      />

      <Box sx={{ overflow: 'auto', paddingBottom: '100px', flex: 1 }}>
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
                    marginTop: 0,
                    padding: theme.spacing(1),
                    width: '100%',
                    position: 'sticky',
                    top: 0,
                    zIndex: 10,
                    textAlign: 'initial',
                    display: 'flex',
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 'bold',
                      fontSize: 22,
                      textAlign: 'initial',
                      flex: 1,
                    }}
                  >
                    {category?.name}
                  </Typography>

                  {category.description && (
                    <Box sx={{ marginRight: theme.spacing(2) }}>
                      <DealBtn dealDescription={category.description} />
                    </Box>
                  )}
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

      <FixedBottomConrainer>
        <Button variant="text" onClick={handleClickBack}>
          {t('back')}
        </Button>
        <Grow direction="up" in>
          <Badge
            color="error"
            invisible={numberOfDishesInMyOrder === 0}
            badgeContent={numberOfDishesInMyOrder}
            sx={{ flex: 1 }}
          >
            <Button variant="contained" fullWidth onClick={handleClickDone}>
              {t('im_done')}
            </Button>
          </Badge>
        </Grow>
      </FixedBottomConrainer>
    </Box>
  )
}

export default DishesPage
