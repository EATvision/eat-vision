import React from 'react'
import { useV1IngredientsByIds } from 'hooks/ingredients'
import IngredientsTree from 'components/DinersView/DishCard/IngredientsTree'

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

  const allTopLevelIngredients = React.useMemo(
    () => [
      ...new Map(
        [
          ...(mandatoryIngredients || []),
          ...(excludableIngredients || []),
          ...(putasideIngredients || []),
          ...(choiceIngredients || []),
          ...(sideDishIngredients || []),
          ...(addableIngredientsIngredients || []),
          ...(addableDishesIngredients || []),
        ].map((item) => [item['id'], item])
      ).values(),
    ],
    [
      addableDishesIngredients,
      addableIngredientsIngredients,
      choiceIngredients,
      excludableIngredients,
      mandatoryIngredients,
      putasideIngredients,
      sideDishIngredients,
    ]
  )

  return (
    <>
      {allTopLevelIngredients?.length > 0 && (
        <>
          <IngredientsTree ingredients={allTopLevelIngredients} />
        </>
      )}
    </>
  )
}

export default IngredientsInfo
