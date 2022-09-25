const { Router } = require("express");
const router = Router();

const kitchens = require("../data/new/kitchens.json")
const menus = require("../data/new/menus.json")
const dishes = require("../data/new/dishes.json")
const ingredients = require("../data/new/ingredients.json")
const diets = require("../data/new/diets.json")
const categories = require("../data/new/categories.json")

const uniq = require("lodash/uniq")
const keyBy = require("lodash/keyBy")
const intersection = require("lodash/intersection")


const ingredientsById = keyBy(ingredients, 'id')
const dishesById = keyBy(dishes, '_id')

router.get("/", (_req, res) => {
  res.send(kitchens);
});

router.get("/:kitchenId", (req, res) => {
  const { params: { kitchenId } } = req
  res.send(kitchens.find(kitchen => kitchen.id === kitchenId))
});

router.get("/:kitchenId/categories", (req, res) => {
  res.send(categories)
});

router.get("/:kitchenId/menus", (req, res) => {
  const { params: { kitchenId } } = req

  const relevanceMenus = menus.filter(menu => menu?.kitchens?.includes(kitchenId))
  res.send(relevanceMenus)
});

router.get("/:kitchenId/menus/:menuId/categories", (req, res) => {
  const { params: { kitchenId, menuId } } = req

  const relevanceMenu = menus.find(menu => menu?.id === menuId)
  const relevantCategories = categories.filter(category => relevanceMenu?.categories?.includes(category.id))
  res.send(relevantCategories)
});

router.post("/:kitchenId/menus/:menuId/dishes/search", (req, res) => {
  const { params: { kitchenId, menuId }, body: filters } = req
  const relevantMenu = menus.find(menu => menu.id === menuId)
  const relevantDishes = dishes.filter(dish => relevantMenu?.categories?.includes(dish?.categories?.[0]))

  const modifiedDishes = getModifiedDishes(relevantDishes, filters)

  res.send({ totalDishes: modifiedDishes, filteredDishes: modifiedDishes })
});

const setAllChildIngredients = (result, ingredientId) => {
  const ingredient = ingredientsById[ingredientId]
  while (!result.includes(ingredientId)) {
    result.push(ingredientId)
    const subIngredients = ingredient.subIngredients
    if (subIngredients?.length) {
      for (let index = 0; index < subIngredients.length; index++) {
        const ing = subIngredients[index];
        setAllChildIngredients(result, ing)
      }
    }
  }
}


const getComponentLimitations = (component, filters) => {
  let intersectingAvoidedIngredients = []
  let ingredientsExludedInDiets = []
  let isFilteredOut = false
  if (component.type === 'ingredient') {
    let allChildIngredients = []
    setAllChildIngredients(allChildIngredients, component.id)
    const combinedChildIngredientsExcludedInDiets = uniq(allChildIngredients.reduce((acc, ing) => {
      return [...acc, ...(ingredientsById?.[ing]?.excludedInDiets || [])]
    }, []))

    intersectingAvoidedIngredients = intersection(filters.avoid || [], allChildIngredients)
    ingredientsExludedInDiets = intersection(filters.diets || [], combinedChildIngredientsExcludedInDiets)
    isFilteredOut = intersectingAvoidedIngredients.length > 0 || ingredientsExludedInDiets.length > 0
  }
  return {
    intersectingAvoidedIngredients,
    ingredientsExludedInDiets,
    isFilteredOut,
  }
}

const getModifiedDishes = (dishes, filters) => (
  dishes.map(dish => {
    let isMainDishFilteredOut = false
    let intersectingAvoidedMandatoryIngredients = []
    let mandatoryIngredientsExludedInDiets = []

    const modifiedMandatoryComponents = dish.recipe.mandatory.map(component => {
      const {
        intersectingAvoidedIngredients,
        ingredientsExludedInDiets,
        isFilteredOut,
      } = getComponentLimitations(component, filters)

      intersectingAvoidedMandatoryIngredients = uniq([...intersectingAvoidedIngredients, ...intersectingAvoidedMandatoryIngredients])
      mandatoryIngredientsExludedInDiets = uniq([...ingredientsExludedInDiets, ...mandatoryIngredientsExludedInDiets])

      isMainDishFilteredOut = isMainDishFilteredOut || isFilteredOut || mandatoryIngredientsExludedInDiets.length > 0 || intersectingAvoidedMandatoryIngredients.length > 0
      return {
        ...component,
        intersectingAvoidedIngredients,
        ingredientsExludedInDiets,
        isFilteredOut,
        ...(isMainDishFilteredOut ? { name: ingredientsById[component.id].name } : {})
      }
    })

    const modifiedExcludableComponents = dish.recipe.excludable.map(component => {
      const {
        intersectingAvoidedIngredients,
        ingredientsExludedInDiets,
        isFilteredOut
      } = getComponentLimitations(component, filters)

      return {
        ...component,
        intersectingAvoidedIngredients,
        ingredientsExludedInDiets,
        isFilteredOut,
        ...(isFilteredOut ? { name: ingredientsById[component.id].name } : {})
      }
    })

    const modifiedChoiceComponents = dish.recipe.choice.map(component => {
      const {
        intersectingAvoidedIngredients,
        ingredientsExludedInDiets,
        isFilteredOut
      } = getComponentLimitations(component, filters)

      return {
        ...component,
        intersectingAvoidedIngredients,
        ingredientsExludedInDiets,
        isFilteredOut,
        ...(isFilteredOut ? { name: ingredientsById[component.id].name } : {})
      }
    })

    const modifiedSideDishes = dish.recipe.sideDish.map(sideDish => ({ ...getModifiedDishes([dishesById[sideDish.id]], filters)[0], price: sideDish.price }))
    const addableComponents = [
      ...dish.recipe.addableIngredients.map(component => {
        const {
          intersectingAvoidedIngredients,
          ingredientsExludedInDiets,
          isFilteredOut
        } = getComponentLimitations(component, filters)

        return {
          ...component,
          intersectingAvoidedIngredients,
          ingredientsExludedInDiets,
          isFilteredOut,
          name: ingredientsById[component.id].name,
        }
      }),
      ...dish.recipe.addableDishes.map(sideDish => ({ ...getModifiedDishes([dishesById[sideDish.id]], filters)[0], price: sideDish.price }))
    ]

    return {
      ...dish,
      isMainDishFilteredOut,
      intersectingAvoidedMandatoryIngredients,
      mandatoryIngredientsExludedInDiets,
      recipe: {
        ...dish.recipe,
        mandatory: modifiedMandatoryComponents,
        excludable: modifiedExcludableComponents,
        choice: modifiedChoiceComponents,
        sideDish: modifiedSideDishes,
        addableComponents,
      }
    }
  })
)

module.exports = router