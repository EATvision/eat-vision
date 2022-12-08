const uniq = require('lodash/uniq')
const keyBy = require('lodash/keyBy')
const intersection = require('lodash/intersection')

const dishes = require('../data/raw/dishes.json')
const ingredients = require('../data/raw/ingredients.json')
const foodGroups = require('../data/raw/foodGroups.json')

const foodGroupsById = keyBy(foodGroups, 'id')
const ingredientsById = keyBy(ingredients, 'id')
const dishesById = keyBy(dishes, 'id')

const setAllChildIngredients = (result, ingredientId) => {
  const ingredient = ingredientsById[ingredientId]
  while (!result.includes(ingredientId)) {
    result.push(ingredientId)
    const subIngredients = ingredient.subIngredients
    if (subIngredients?.length) {
      for (let index = 0; index < subIngredients.length; index++) {
        const ing = subIngredients[index]
        setAllChildIngredients(result, ing)
      }
    }
  }
}

const setAllParentGroups = (result, groupId) => {
  result.push(groupId)
  const group = foodGroupsById[groupId]
  const parentGroups = group.parentGroups
  while (parentGroups?.length && !result.includes(groupId)) {
    for (let index = 0; index < parentGroups.length; index++) {
      const gr = parentGroups[index]
      setAllParentGroups(result, gr)
    }
  }
}


const getComponentLimitations = (component, filters) => {
  let intersectingExcludedIngredients = []
  let ingredientsExludedInFoodGroups = []
  let ingredientsExludedInDiets = []
  let isFilteredOut = false

  const excludedComponents = [
    ...(filters.exclude || []),
    ...(filters.allergies || []),
    ...(filters.avoidOrReduce || []),
  ]
  if (component.type === 'ingredient') {
    let allChildIngredients = []
    setAllChildIngredients(allChildIngredients, component.id)
    const combinedChildIngredientsExcludedInDiets = uniq(
      allChildIngredients.reduce((acc, ing) => {
        return [...acc, ...(ingredientsById?.[ing]?.excludedInDiets || [])]
      }, [])
    )

    const combinedChildIngredientsFoodGroups = uniq(
      allChildIngredients.reduce((acc, ing) => {
        return [...acc, ...(ingredientsById?.[ing]?.foodGroups || [])]
      }, [])
    )

    intersectingExcludedIngredients = intersection(
      excludedComponents,
      allChildIngredients
    )
    ingredientsExludedInDiets = intersection(
      filters.diets || [],
      combinedChildIngredientsExcludedInDiets
    )

    ingredientsExludedInFoodGroups = intersection(
      [...filters.exclude || [], ...filters.avoidOrReduce || [], ...filters.allergies || []],
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
    isFilteredOut,
  }
}

const getModifiedDishes = (dishes, filters) =>
  dishes.map((dish) => {
    let isMainDishFilteredOut = false
    let intersectingExcludedMandatoryIngredients = []
    let intersectingExcludedMandatoryFoodGroups = []
    let mandatoryIngredientsExludedInDiets = []

    const modifiedMandatoryComponents = dish.recipe.mandatory?.map(
      (component) => {
        const {
          intersectingExcludedIngredients,
          ingredientsExludedInDiets,
          ingredientsExludedInFoodGroups,
          isFilteredOut,
        } = getComponentLimitations(component, filters)

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
        } = getComponentLimitations(component, filters)

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
        } = getComponentLimitations(component, filters)

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
      ...getModifiedDishes([dishesById[sideDish.id]], filters)[0],
      price: sideDish.price,
    }))

    const addableComponents = [
      ...(dish.recipe.addableIngredients?.map((component) => {
        const {
          intersectingExcludedIngredients,
          ingredientsExludedInDiets,
          ingredientsExludedInFoodGroups,
          isFilteredOut,
        } = getComponentLimitations(component, filters)

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
        ...getModifiedDishes([dishesById[d.id]], filters)[0],
        price: d.price,
      }))) || [],
    ]

    return {
      ...dish,
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
