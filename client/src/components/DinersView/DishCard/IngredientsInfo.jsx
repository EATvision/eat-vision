import React from 'react'
import { Typography } from '@mui/material'
import { useV1IngredientsByIds } from 'hooks/ingredients'
import IngredientsTree from 'components/DinersView/DishCard/IngredientsTree'
import { t } from 'i18next'

function IngredientsInfo({ data }) {
  const { ingredients: mandatoryIngredients } = useV1IngredientsByIds(
    data.recipe.mandatory.map((c) => c.id)
  )

  const { ingredients: excludableIngredients } = useV1IngredientsByIds(
    data.recipe.excludable.map((c) => c.id)
  )

  const { ingredients: putasideIngredients } = useV1IngredientsByIds(
    data.recipe.putaside.map((c) => c.id)
  )

  const { ingredients: choiceIngredients } = useV1IngredientsByIds(
    data.recipe.choice.map((c) => c.id)
  )

  const { ingredients: sideDishIngredients } = useV1IngredientsByIds(
    data.recipe.sideDish.map((c) => c.id)
  )

  const { ingredients: addableIngredientsIngredients } = useV1IngredientsByIds(
    data.recipe.addableIngredients.map((c) => c.id)
  )

  const { ingredients: addableDishesIngredients } = useV1IngredientsByIds(
    data.recipe.addableDishes.map((c) => c.id)
  )

  return (
    <>
      {mandatoryIngredients?.length > 0 && (
        <>
          <Typography>{t('mandatory_ingredients')}</Typography>
          <IngredientsTree ingredients={mandatoryIngredients} />
        </>
      )}

      {excludableIngredients?.length > 0 && (
        <>
          <Typography>{t('excludable_ingredients')}</Typography>
          <IngredientsTree ingredients={excludableIngredients} />
        </>
      )}
      {putasideIngredients?.length > 0 && (
        <>
          <Typography>{t('putaside_ingredients')}</Typography>
          <IngredientsTree ingredients={putasideIngredients} />
        </>
      )}
      {choiceIngredients?.length > 0 && (
        <>
          <Typography>{t('choice_ingredients')}</Typography>
          <IngredientsTree ingredients={choiceIngredients} />
        </>
      )}
      {sideDishIngredients?.length > 0 && (
        <>
          <Typography>{t('sideDish_ingredients')}</Typography>
          <IngredientsTree ingredients={sideDishIngredients} />
        </>
      )}
      {addableIngredientsIngredients?.length > 0 && (
        <>
          <Typography>{t('addable_ingredients')}</Typography>
          <IngredientsTree ingredients={addableIngredientsIngredients} />
        </>
      )}
      {addableDishesIngredients?.length > 0 && (
        <>
          <Typography>{t('addableDishes_ingredients')}</Typography>
          <IngredientsTree ingredients={addableDishesIngredients} />
        </>
      )}
    </>
  )
}

export default IngredientsInfo
