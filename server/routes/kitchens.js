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
const dishesById = keyBy(dishes, 'id')

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

  const modifiedDishes = relevantDishes.map(dish => {
    let isFilteredOut = false
    let intersectingAvoidedMandatoryIngredients = []
    let mandatoryIngredientsExludedInDiets = []

    const modifiedMandatoryComponents = dish.recipe.mandatory.map(component => {
      if (component.type === 'ingredient') {
        let allChildIngredients = []
        setAllChildIngredients(allChildIngredients, component.id)
        const combinedChildIngredientsExcludedInDiets = uniq(allChildIngredients.reduce((acc, ing) => {
          return [...acc, ...(ingredientsById?.[ing]?.excludedInDiets || [])]
        }, []))

        intersectingAvoidedMandatoryIngredients = uniq([...intersectingAvoidedMandatoryIngredients, ...intersection(filters.avoid || [], allChildIngredients)])
        mandatoryIngredientsExludedInDiets = uniq([...mandatoryIngredientsExludedInDiets, ...intersection(filters.diets || [], combinedChildIngredientsExcludedInDiets)])

        isFilteredOut = isFilteredOut || mandatoryIngredientsExludedInDiets.length > 0 || intersectingAvoidedMandatoryIngredients.length > 0
      }
      return {
        ...component,
      }
    })

    return {
      ...dish,
      isFilteredOut,
      intersectingAvoidedMandatoryIngredients,
      mandatoryIngredientsExludedInDiets,
      recipe: {
        ...dish.recipe,
        mandatory: modifiedMandatoryComponents,
      }
    }
  })

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


module.exports = router