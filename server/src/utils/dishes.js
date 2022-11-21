const uniq = require('lodash/uniq')
const keyBy = require('lodash/keyBy')
const intersection = require('lodash/intersection')

const dishes = require('../data/new/dishes.json')
const ingredients = require('../data/new/ingredients.json')

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

const getComponentLimitations = (component, filters) => {
  let intersectingExcludedIngredients = []
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

    intersectingExcludedIngredients = intersection(
      excludedComponents,
      allChildIngredients
    )
    ingredientsExludedInDiets = intersection(
      filters.diets || [],
      combinedChildIngredientsExcludedInDiets
    )
    isFilteredOut =
      intersectingExcludedIngredients.length > 0 ||
      ingredientsExludedInDiets.length > 0
  }
  return {
    intersectingExcludedIngredients,
    ingredientsExludedInDiets,
    isFilteredOut,
  }
}

const getModifiedDishes = (dishes, filters) =>
  dishes.map((dish) => {
    let isMainDishFilteredOut = false
    let intersectingExcludedMandatoryIngredients = []
    let mandatoryIngredientsExludedInDiets = []

    const modifiedMandatoryComponents = dish.recipe.mandatory?.map(
      (component) => {
        const {
          intersectingExcludedIngredients,
          ingredientsExludedInDiets,
          isFilteredOut,
        } = getComponentLimitations(component, filters)

        intersectingExcludedMandatoryIngredients = uniq([
          ...intersectingExcludedIngredients,
          ...intersectingExcludedMandatoryIngredients,
        ])
        mandatoryIngredientsExludedInDiets = uniq([
          ...ingredientsExludedInDiets,
          ...mandatoryIngredientsExludedInDiets,
        ])

        isMainDishFilteredOut =
          isMainDishFilteredOut ||
          isFilteredOut ||
          mandatoryIngredientsExludedInDiets.length > 0 ||
          intersectingExcludedMandatoryIngredients.length > 0
        return {
          ...component,
          intersectingExcludedIngredients,
          ingredientsExludedInDiets,
          isFilteredOut,
          ...(isMainDishFilteredOut
            ? { name: ingredientsById[component.id].name }
            : {}),
        }
      }
    )

    const modifiedExcludableComponents = dish.recipe.excludable?.map(
      (component) => {
        const {
          intersectingExcludedIngredients,
          ingredientsExludedInDiets,
          isFilteredOut,
        } = getComponentLimitations(component, filters)

        return {
          ...component,
          intersectingExcludedIngredients,
          ingredientsExludedInDiets,
          isFilteredOut,
          ...{
            name: ingredientsById[component.id].name,
            translation_heb: ingredientsById[component.id].translation_heb,
          },
        }
      }
    )

    const modifiedChoiceComponents = dish.recipe.choice?.map((component) => {
      const {
        intersectingExcludedIngredients,
        ingredientsExludedInDiets,
        isFilteredOut,
      } = getComponentLimitations(component, filters)

      return {
        ...component,
        intersectingExcludedIngredients,
        ingredientsExludedInDiets,
        isFilteredOut,
        name: ingredientsById[component.id].name,
        translation_heb: ingredientsById[component.id].translation_heb,
      }
    })

    isMainDishFilteredOut =
      isMainDishFilteredOut ||
      (modifiedChoiceComponents?.length > 0 &&
        modifiedChoiceComponents.every((c) => c.isFilteredOut))

    const modifiedSideDishes = dish.recipe.sideDish?.map((sideDish) => ({
      ...getModifiedDishes([dishesById[sideDish.id]], filters)[0],
      price: sideDish.price,
    }))
    const addableComponents = [
      ...(dish.recipe.addableIngredients?.map((component) => {
        const {
          intersectingExcludedIngredients,
          ingredientsExludedInDiets,
          isFilteredOut,
        } = getComponentLimitations(component, filters)

        return {
          ...component,
          intersectingExcludedIngredients,
          ingredientsExludedInDiets,
          isFilteredOut,
          name: ingredientsById[component.id].name,
          translation_heb: ingredientsById[component.id].translation_heb,
        }
      }) || []),
      ...(dish.recipe.addableDishes?.map((sideDish) => ({
        ...getModifiedDishes([dishesById[sideDish.id]], filters)[0],
        price: sideDish.price,
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
        choice: modifiedChoiceComponents,
        sideDish: modifiedSideDishes,
        addableComponents,
      },
    }
  })

module.exports = {
  setAllChildIngredients,
  getComponentLimitations,
  getModifiedDishes,
}
