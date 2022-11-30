import React from 'react'
import { List, ListItem } from '@mui/material'
import { useGetComponentLabel, useV1IngredientsByIds } from 'hooks/ingredients'
import IngredientsTree from 'components/DinersView/DishCard/IngredientsTree'

const _keyBy = require('lodash/keyBy')

function IngredientsInfo({ data }) {
  const relevantIds = [
    ...data.recipe.mandatory.map((c) => c.id),
    ...data.recipe.excludable.map((c) => c.id),
    ...data.recipe.putaside.map((c) => c.id),
    ...data.recipe.choice.map((c) => c.id),
    ...data.recipe.sideDish.map((c) => c.id),
    ...data.recipe.addableIngredients.map((c) => c.id),
    ...data.recipe.addableDishes.map((c) => c.id),
  ]

  const { ingredients } = useV1IngredientsByIds(relevantIds)
  const ingredientsById = _keyBy(ingredients, 'id')
  const getComponentLabel = useGetComponentLabel()

  return (
    <>
      <IngredientsTree />
      <List>
        {ingredients?.map((ing) => (
          <ListItem key={ing.id}>
            {getComponentLabel(ingredientsById?.[ing.id])}
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default IngredientsInfo
