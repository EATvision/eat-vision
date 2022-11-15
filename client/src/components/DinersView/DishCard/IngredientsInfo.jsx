import React from 'react'
import {
  List, ListItem,
} from '@mui/material'
import { useGetComponentLabel, useIngredientsByIds } from '../../../hooks/ingredients'

const _keyBy = require('lodash/keyBy')

function IngredientsInfo({ data }) {
  const relevantIds = [...data.recipe.putaside.map((c) => c.id), ...data.recipe.mandatory.map((c) => c.id)]

  const { ingredients } = useIngredientsByIds(relevantIds)
  const ingredientsById = _keyBy(ingredients, 'id')
  const getComponentLabel = useGetComponentLabel()

  return (
    <List>
      {
        ingredients?.map((ing) => (
          <ListItem key={ing.id}>
            {getComponentLabel(ingredientsById?.[ing.id])}
          </ListItem>
        ))
      }
    </List>
  )
}

export default IngredientsInfo
