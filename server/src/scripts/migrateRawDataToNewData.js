const fs = require('fs')
const JSONStream = require('JSONStream')
const keyBy = require('lodash/keyBy')
const get = require('lodash/get')
const _intersection = require('lodash/intersection')

const { setAllChildIngredients, setAllParentGroups } = require('../utils/dishes')

const kitchens = require(('../../src/data/raw/kitchens.json'))
const diets = require(('../../src/data/raw/diets.json'))
const ingredients = require(('../../src/data/raw/ingredients.json'))
const categories = require(('../../src/data/raw/categories.json'))
const menus = require(('../../src/data/raw/menus.json'))
const locations = require(('../../src/data/raw/locations.json'))
const workingHours = require(('../../src/data/raw/working_hours.json'))
const sizes = require(('../../src/data/raw/sizes.json'))

const dishes = require(('../../src/data/raw/dishes.json'))
const foodGroups = require(('../../src/data/raw/foodGroups.json'))
const recipes = require(('../../src/data/raw/recipes.json'))
const choices_ingredients = require(('../../src/data/raw/choices_ingredients.json'))
const choices_subdishes = require(('../../src/data/raw/choices_subdishes.json'))

const ingredientsById = keyBy(ingredients, 'id')
const sizesById = keyBy(sizes, 'id')

const getIngSubIngredients = (ing) => {
  let allChildIngredients = []
  setAllChildIngredients(allChildIngredients, ing.id)
  return allChildIngredients
}

const getAllParentFoodGroups = (initialGroupIds) => {
  let foodGroups = []
  initialGroupIds.forEach(groupId => setAllParentGroups(foodGroups, groupId))
  return foodGroups
}

const modifiedIngredients = ingredients.map(ing => {
  const allIngredientComponentsIds = getIngSubIngredients(ing)

  let allGroupsOfIng = []
  allIngredientComponentsIds.forEach(ingId => {
    allGroupsOfIng = [...allGroupsOfIng, ...(ingredientsById[ingId]?.groups || [])]
  })
  const allllllllFoodGroupsIncludingParentsRecursively = getAllParentFoodGroups(allGroupsOfIng)

  allGroupsOfIng = [...new Set(allllllllFoodGroupsIncludingParentsRecursively)]

  const excludedInDiets = diets.reduce((acc, diet) => {
    if (_intersection(allGroupsOfIng, diet?.excluded_groups)?.length > 0) {
      return [...acc, diet.id]
    }
    return acc
  }, [])

  return ({
    ...ing,
    excludedInDiets,
    isSearchable: ing.isSearchable === 'TRUE' ? true : false
  })
})


const recipesById = keyBy(recipes, 'id')
const choicesIngredientsById = keyBy(choices_ingredients, 'id')
const choicesSubDishesById = keyBy(choices_subdishes, 'id')

const modifiedDishes = dishes.map(dish => {
  const dishRecipe = recipesById[get(dish, 'recipe[0]')]
  const choicesInDish = get(dishRecipe, 'Choice_ingredients', []).map(choiceId => choicesIngredientsById[choiceId])
  const choiceSubDishes = get(choicesSubDishesById, `[${get(dishRecipe, 'Choice_side_dish[0]')}]`, {})
  const addableIngredients = get(choicesIngredientsById, `[${get(dishRecipe, 'addable_ingridients[0]')}]`, {})
  const addableDishes = get(choicesSubDishesById, `[${get(dishRecipe, 'addable_dishs[0]')}]`, {})

  const sizesObject = sizesById[dish?.sizes?.[0]]
  const sizes = [
    sizesObject?.['smallest_size_name'] && {
      type: sizesObject['smallest_size_name'],
      price: sizesObject['smallest_price_delta']
    },
    sizesObject?.['2nd_size_name'] && {
      type: sizesObject['2nd_size_name'],
      price: sizesObject['2nd_size_price_delta']
    },
    sizesObject?.['3nd_size_name'] && {
      type: sizesObject['3nd_size_name'],
      price: sizesObject['3nd_size_name']
    },
  ].filter(Boolean)



  return {
    id: dish.id,
    name: dish.name,
    description: dish.description,
    longDescription: dish.longDescription,
    categories: dish.category,
    image: dish?.image?.[0],
    price: dish?.price,
    kitchenId: dish?.kitchenIds[0],
    dishType: dish?.dishType?.[0]?.trim(),
    sizes,
    recipe: {
      mandatory: get(dishRecipe, 'mandatory_ingredients', []).map(ing => ({ type: 'ingredient', id: ing })),
      excludable: get(dishRecipe, 'excludable_ingredients', []).map(ing => ({ type: 'ingredient', id: ing })),
      putaside: get(dishRecipe, 'putaside_ingredients', []).map(ing => ({ type: 'ingredient', id: ing })),
      choice: choicesInDish.map(choiceIngredients => {
        return ([
          choiceIngredients.ingredient1 && {
            type: 'ingredient',
            id: choiceIngredients.ingredient1[0],
            price: choiceIngredients.ingredient1_delta_price || Number(0)
          },
          choiceIngredients.ingredient2 && {
            type: 'ingredient',
            id: choiceIngredients.ingredient2[0],
            price: choiceIngredients.ingredient2_delta_price || Number(0)
          },
          choiceIngredients.ingredient3 && {
            type: 'ingredient',
            id: choiceIngredients.ingredient3[0],
            price: choiceIngredients.ingredient3_delta_price || Number(0)
          },
          choiceIngredients.ingredient4 && {
            type: 'ingredient',
            id: choiceIngredients.ingredient4[0],
            price: choiceIngredients.ingredient4_delta_price || Number(0)
          },
          choiceIngredients.ingredient5 && {
            type: 'ingredient',
            id: choiceIngredients.ingredient5[0],
            price: choiceIngredients.ingredient5_delta_price || Number(0)
          },
          choiceIngredients.ingredient6 && {
            type: 'ingredient',
            id: choiceIngredients.ingredient6[0],
            price: choiceIngredients.ingredient6_delta_price || Number(0)
          },
        ].filter(Boolean))
      }),
      sideDish: [
        choiceSubDishes.Dish1 && {
          type: 'dish',
          id: choiceSubDishes.Dish1[0],
          price: choiceSubDishes.Dish1_delta_price || Number(0)
        },
        choiceSubDishes.Dish2 && {
          type: 'dish',
          id: choiceSubDishes.Dish2[0],
          price: choiceSubDishes.Dish2_delta_price || Number(0)
        },
        choiceSubDishes.Dish3 && {
          type: 'dish',
          id: choiceSubDishes.Dish3[0],
          price: choiceSubDishes.Dish3_delta_price || Number(0)
        },
        choiceSubDishes.Dish4 && {
          type: 'dish',
          id: choiceSubDishes.Dish4[0],
          price: choiceSubDishes.Dish4_delta_price || Number(0)
        },
        choiceSubDishes.Dish5 && {
          type: 'dish',
          id: choiceSubDishes.Dish5[0],
          price: choiceSubDishes.Dish5_delta_price || Number(0)
        },
        choiceSubDishes.Dish6 && {
          type: 'dish',
          id: choiceSubDishes.Dish6[0],
          price: choiceSubDishes.Dish6_delta_price || Number(0)
        },
      ].filter(Boolean),
      addableIngredients: [
        addableIngredients.ingredient1 && {
          type: 'ingredient',
          id: addableIngredients.ingredient1[0],
          price: addableIngredients.ingredient1_delta_price || Number(0)
        },
        addableIngredients.ingredient2 && {
          type: 'ingredient',
          id: addableIngredients.ingredient2[0],
          price: addableIngredients.ingredient2_delta_price || Number(0)
        },
        addableIngredients.ingredient3 && {
          type: 'ingredient',
          id: addableIngredients.ingredient3[0],
          price: addableIngredients.ingredient3_delta_price || Number(0)
        },
        addableIngredients.ingredient4 && {
          type: 'ingredient',
          id: addableIngredients.ingredient4[0],
          price: addableIngredients.ingredient4_delta_price || Number(0)
        },
        addableIngredients.ingredient5 && {
          type: 'ingredient',
          id: addableIngredients.ingredient5[0],
          price: addableIngredients.ingredient5_delta_price || Number(0)
        },
        addableIngredients.ingredient6 && {
          type: 'ingredient',
          id: addableIngredients.ingredient6[0],
          price: addableIngredients.ingredient6_delta_price || Number(0)
        },
      ].filter(Boolean),
      addableDishes: [
        addableDishes.Dish1 && {
          type: 'dish',
          id: addableDishes.Dish1[0],
          price: addableDishes.Dish1_delta_price || Number(0)
        },
        addableDishes.Dish2 && {
          type: 'dish',
          id: addableDishes.Dish2[0],
          price: addableDishes.Dish2_delta_price || Number(0)
        },
        addableDishes.Dish3 && {
          type: 'dish',
          id: addableDishes.Dish3[0],
          price: addableDishes.Dish3_delta_price || Number(0)
        },
        addableDishes.Dish4 && {
          type: 'dish',
          id: addableDishes.Dish4[0],
          price: addableDishes.Dish4_delta_price || Number(0)
        },
        addableDishes.Dish5 && {
          type: 'dish',
          id: addableDishes.Dish5[0],
          price: addableDishes.Dish5_delta_price || Number(0)
        },
        addableDishes.Dish6 && {
          type: 'dish',
          id: addableDishes.Dish6[0],
          price: addableDishes.Dish6_delta_price || Number(0)
        },
      ].filter(Boolean),
    }
  }
})

fs.writeFileSync('./src/data/new/sizes.json', JSON.stringify(sizes))
fs.writeFileSync('./src/data/new/kitchens.json', JSON.stringify(kitchens))
fs.writeFileSync('./src/data/new/diets.json', JSON.stringify(diets))
fs.writeFileSync('./src/data/new/menus.json', JSON.stringify(menus))
fs.writeFileSync('./src/data/new/locations.json', JSON.stringify(locations))
fs.writeFileSync('./src/data/new/workingHours.json', JSON.stringify(workingHours))
fs.writeFileSync('./src/data/new/foodGroups.json', JSON.stringify(foodGroups))

fs.writeFileSync('./src/data/new/categories.json', JSON.stringify(categories))

const transformStreamIngredients = JSONStream.stringify()
const outputStreamIngredients = fs.createWriteStream('./src/data/new/ingredients.json')
transformStreamIngredients.pipe(outputStreamIngredients)
modifiedIngredients.forEach(transformStreamIngredients.write)
transformStreamIngredients.end()

outputStreamIngredients.on(
  'finish',
  function handleFinish() {
    console.log('Done')
  }
)

const transformStreamDishes = JSONStream.stringify()
const outputStreamDishes = fs.createWriteStream('./src/data/new/dishes.json')
transformStreamDishes.pipe(outputStreamDishes)
modifiedDishes.forEach(transformStreamDishes.write)
transformStreamDishes.end()

outputStreamDishes.on(
  'finish',
  function handleFinish() {
    console.log('Done')
  }
)

console.log('done')