const uniq = require('lodash/uniq')
const intersection = require('lodash/intersection')

const setAllChildIngredients = (result, ingredientId, ingredientsById) => {
  const ingredient = ingredientsById[ingredientId]
  while (!result.includes(ingredientId)) {
    result.push(ingredientId)
    const subIngredients = ingredient.subIngredients
    if (subIngredients?.length) {
      for (let index = 0; index < subIngredients.length; index++) {
        const ing = subIngredients[index]
        setAllChildIngredients(result, ing, ingredientsById)
      }
    }
  }
}

const setAllParentGroups = (result, groupId, foodGroupsById) => {
  result.push(groupId)
  const group = foodGroupsById[groupId]
  const parentGroups = group.parentGroups
  while (parentGroups?.length && !result.includes(groupId)) {
    for (let index = 0; index < parentGroups.length; index++) {
      const gr = parentGroups[index]
      setAllParentGroups(result, gr, foodGroupsById)
    }
  }
}

const getComponentLimitations = (component, filters, ingredientsById) => {
  let intersectingExcludedIngredients = []
  let ingredientsExludedInFoodGroups = []
  let ingredientsExludedInDiets = []
  let combinedChildIngredientsAllergens = []
  let isFilteredOut = false

  const excludedComponents = [
    ...(filters?.exclude || []),
    ...(filters?.allergies || []),
    ...(filters?.avoidOrReduce || []),
  ]
  if (component.type === 'ingredient') {
    let allChildIngredients = []
    setAllChildIngredients(allChildIngredients, component.id, ingredientsById)
    const combinedChildIngredientsExcludedInDiets = uniq(
      allChildIngredients.reduce((acc, ing) => {
        return [...acc, ...(ingredientsById?.[ing]?.excludedInDiets || [])]
      }, [])
    )

    const combinedChildIngredientsFoodGroups = uniq(
      allChildIngredients.reduce((acc, ing) => {
        return [...acc, ...(ingredientsById?.[ing]?.allergens || [])]
      }, [])
    )

    combinedChildIngredientsAllergens = uniq(
      allChildIngredients.reduce((acc, ing) => {
        return [...acc, ...(ingredientsById?.[ing]?.allergens || [])]
      }, [])
    )

    intersectingExcludedIngredients = intersection(
      excludedComponents,
      allChildIngredients
    )

    ingredientsExludedInDiets = intersection(
      filters?.diets || [],
      combinedChildIngredientsExcludedInDiets
    )

    ingredientsExludedInFoodGroups = intersection(
      [...filters?.exclude || [], ...filters?.avoidOrReduce || [], ...filters?.allergies || []],
      combinedChildIngredientsFoodGroups
    )

    isFilteredOut =
      intersectingExcludedIngredients.length > 0 ||
      ingredientsExludedInDiets.length > 0 ||
      ingredientsExludedInFoodGroups.length > 0
  }
  return {
    intersectingExcludedIngredients,
    ingredientsExludedInDiets,
    ingredientsExludedInFoodGroups,
    allergens: combinedChildIngredientsAllergens,
    isFilteredOut,
  }
}

const getModifiedDishes = (dishes, filters, { dishesById, ingredientsById }) =>
  dishes.map((dish) => {
    let isMainDishFilteredOut = false
    let intersectingExcludedMandatoryIngredients = []
    let intersectingExcludedMandatoryFoodGroups = []
    let mandatoryIngredientsExludedInDiets = []
    let dishAllergens = []

    const modifiedMandatoryComponents = dish.recipe.mandatory?.map(
      (component) => {
        const {
          intersectingExcludedIngredients,
          ingredientsExludedInDiets,
          ingredientsExludedInFoodGroups,
          isFilteredOut,
          allergens: mandatoryIngredientsAllergens,
        } = getComponentLimitations(component, filters, ingredientsById)

        intersectingExcludedMandatoryIngredients = uniq([
          ...intersectingExcludedIngredients,
          ...intersectingExcludedMandatoryIngredients,
        ])
        intersectingExcludedMandatoryFoodGroups = uniq([
          ...ingredientsExludedInFoodGroups,
          ...intersectingExcludedMandatoryFoodGroups,
        ])
        mandatoryIngredientsExludedInDiets = uniq([
          ...ingredientsExludedInDiets,
          ...mandatoryIngredientsExludedInDiets,
        ])

        dishAllergens = uniq([
          ...mandatoryIngredientsAllergens,
          ...dishAllergens,
        ])

        isMainDishFilteredOut =
          isMainDishFilteredOut ||
          isFilteredOut ||
          mandatoryIngredientsExludedInDiets.length > 0 ||
          intersectingExcludedMandatoryIngredients.length > 0 ||
          intersectingExcludedMandatoryFoodGroups.length > 0
        return {
          ...component,
          intersectingExcludedIngredients,
          intersectingExcludedMandatoryFoodGroups,
          ingredientsExludedInDiets,
          isFilteredOut,
          ...(ingredientsById[component.id]),
        }
      }
    )

    const modifiedExcludableComponents = dish.recipe.excludable?.map(
      (component) => {
        const {
          intersectingExcludedIngredients,
          ingredientsExludedInDiets,
          ingredientsExludedInFoodGroups,
          isFilteredOut,
          allergens: excludableIngredientsAllergens,
        } = getComponentLimitations(component, filters, ingredientsById)

        dishAllergens = uniq([
          ...excludableIngredientsAllergens,
          ...dishAllergens,
        ])

        return {
          ...component,
          intersectingExcludedIngredients,
          ingredientsExludedInDiets,
          ingredientsExludedInFoodGroups,
          isFilteredOut,
          ...(ingredientsById[component.id]),
        }
      }
    )

    const modifiedChoice = dish.recipe.choice?.map(choice => {
      return choice.map((component) => {
        const {
          intersectingExcludedIngredients,
          ingredientsExludedInDiets,
          ingredientsExludedInFoodGroups,
          isFilteredOut,
          allergens: choiceIngredientsAllergens,
        } = getComponentLimitations(component, filters, ingredientsById)

        dishAllergens = uniq([
          ...choiceIngredientsAllergens,
          ...dishAllergens,
        ])

        return {
          ...component,
          intersectingExcludedIngredients,
          ingredientsExludedInDiets,
          ingredientsExludedInFoodGroups,
          isFilteredOut,
          ...(ingredientsById[component.id]),
        }
      })
    })

    isMainDishFilteredOut =
      isMainDishFilteredOut ||
      (
        modifiedChoice?.length > 0 &&
        modifiedChoice.some(choice => choice.every((c) => c.isFilteredOut))
      )

    const modifiedSideDishes = dish.recipe.sideDish?.map((sideDish) => ({
      // TODO: this is a recursive call! Need to add a stop condition to avoid infinite loops!
      ...getModifiedDishes([dishesById[sideDish.id]], filters, { dishesById, ingredientsById })[0],
      price: sideDish.price,
    }))

    const addableComponents = [
      ...(dish.recipe.addableIngredients?.map((component) => {
        const {
          intersectingExcludedIngredients,
          ingredientsExludedInDiets,
          ingredientsExludedInFoodGroups,
          isFilteredOut,
          allergens: addableIngredientsAllergens,
        } = getComponentLimitations(component, filters, ingredientsById)

        dishAllergens = uniq([
          ...addableIngredientsAllergens,
          ...dishAllergens,
        ])

        return {
          ...component,
          intersectingExcludedIngredients,
          ingredientsExludedInDiets,
          ingredientsExludedInFoodGroups,
          isFilteredOut,
          ...(ingredientsById[component.id])
        }
      }) || []),
      ...(dish.recipe.addableDishes?.map((d) => ({
        ...getModifiedDishes([dishesById[d.id]], filters, { dishesById, ingredientsById })[0],
        price: d.price,
      }))) || [],
    ]

    return {
      ...dish,
      dishAllergens,
      isMainDishFilteredOut,
      intersectingExcludedMandatoryIngredients,
      mandatoryIngredientsExludedInDiets,
      recipe: {
        ...dish.recipe,
        mandatory: modifiedMandatoryComponents,
        excludable: modifiedExcludableComponents,
        choice: modifiedChoice,
        sideDish: modifiedSideDishes,
        addableComponents,
      },
    }
  })

module.exports = {
  setAllChildIngredients,
  setAllParentGroups,
  getComponentLimitations,
  getModifiedDishes,
}
