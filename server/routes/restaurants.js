const { Router } = require("express");
const router = Router();

const airtable = require('airtable')
const base = airtable.base("appOPszbMpOH0ySIC");

const data = {
  restaurants: [],
  menus: [],
  dishes: [],
  ingredientGroups: [],
  ingredients: {},
  diets: [],
}

//restaurants
base("tblZl6c3RepInX9BV").select({ view: "Grid view" }).all((_err, records) => {
  const restaurantsData = records.map((r) => ({
    id: r.id,
    display_name: r.get("display_name"),
    logo_url: r.get("logo_url"),
    locale: r.get("locale"),
  }));

  data.restaurants = restaurantsData;
});

//menus
base("tbl9JON90N2fzyNik").select({ view: "Grid view" }).all((_err, records) => {
  const menusData = records.map((r) => ({
    id: r.id,
    display_name: r.get("display_name"),
    working_hours: r.get("working_hours"),
    restaurants: r.get("restaurants"),
    dishes: r.get("Dishes"),
  }));

  data.menus  = menusData;
});

//dishes
base("tblVODysxidY4YSJy").select({ view: "Grid view" }).all((_err, records) => {
  const dishesData = records.reduce((result, r) => ({
    ...result,
    [r.id]: {
    id: r.id,
    menus: r.get("menus"),
    name: r.get("name"),
    ingredients: r.get("ingredients_mandatory"),
    }
  }), {});

  data.dishes  = dishesData;
});

//ingredientGroups
base("tblr8FqxXM1TjvFnQ").select({ view: "Grid view" }).all((_err, records) => {
  const ingredientGroupsData = records.reduce((result, r) => ({
    ...result,
    [r.id]: {
      id: r.id,
      display_name: r.get("display_name"),
      sub_groups: r.get("sub_groups"),
      parent_groups: r.get("parent_groups"),
    }
  }), {});

  data.ingredientGroups  = ingredientGroupsData;
});

//ingredients
base("tblygXPmVmWOVn2af").select({ view: "Grid view" }).all((_err, records) => {
  const ingredientsData = records.reduce((result, r) => ({
    ...result,
    [r.id]: {
      id: r.id,
      name: r.get("name"),
      display_name: r.get("display_name"),
      ingredients: r.get("ingredients(mandatory)"),
      included_in_groups: r.get("included_in_groups"),
    }
  }), {});

  data.ingredients  = ingredientsData;
});

//diets
base("tblnzfOFoOdidnxnZ").select({ view: "Grid view" }).all((_err, records) => {
  const dietsData = records.map((r) => ({
    id: r.id,
    name: r.get("name"),
    excluded_groups: r.get("excluded_groups"),
  }));

  data.diets  = dietsData;
});





router.get("/", (_req, res) => {
   base("tblZl6c3RepInX9BV").select({ view: "Grid view" }).all((_err, records) => {
    const restaurantsData = records.map((r) => ({
      id: r.id,
      display_name: r.get("display_name"),
      logo_url: r.get("logo_url"),
      locale: r.get("locale"),
    }));

    res.send(restaurantsData);
  });
});

router.get("/:restaurantId", (req, res) => {
  const { params: { restaurantId } } = req

  base("tblZl6c3RepInX9BV").select({ view: "Grid view" }).all((_err, records) => {
    const restaurantData = records.find(r => (r.id === restaurantId));
    
    res.send({
      id: restaurantData.id,
      display_name: restaurantData.get("display_name"),
      logo_url: restaurantData.get("logo_url"),
      locale: restaurantData.get("locale"),
      menus: restaurantData.get("Menus"),
    })

  }, function done(error) {
  })
});

router.get("/:restaurantId/menus", (req, res) => {
  const { params: { restaurantId } } = req

  const relevanceMenus = data.menus.filter(menu => menu?.restaurants?.includes(restaurantId))
  res.send(relevanceMenus)
});

router.post("/:restaurantId/menus/:menuId/dishes/search", (req, res) => {
  const { params: { restaurantId, menuId }, body: filters } = req

  const relevantDiets = filters.diets.map(diet => data.diets.find(dataDiet => dataDiet.name === diet))

  const totalDishes = Object.values(data.dishes).filter(dish => {
    const isDishInMenu = dish?.menus?.includes(menuId)
    return isDishInMenu
  })

  const filteredDishes = totalDishes.filter(dish => {
    const dishIngredients = dish.ingredients?.map(ingredientId => (data.ingredients[ingredientId]))
    const isDishAllowedInDiets = !dishIngredients?.some(ingredient => (
      ingredient?.included_in_groups?.some(group => {
        let parentGroups = []
        setResultParentGroupsOfGroupId(parentGroups, group)
        return parentGroups.some(parentGroup => (
          relevantDiets?.some(diet => diet?.excluded_groups.includes(parentGroup))
        ))
      })
    ))
    
    
    
    
    
    // !relevantDiets.some(relevantDiet => (
    //   relevantDiet?.excluded_groups?.some(excludedGroup => (
    //     dishIngredients?.some(ingredient => (
    //       ingredient?.included_in_groups?.includes(excludedGroup)
    //     ))
    //   ))
    // ))
    return isDishAllowedInDiets
  })

  res.send({ totalDishes, filteredDishes })
});

const setResultParentGroupsOfGroupId = (result, groupId) => {
  while (!result.includes(groupId)) {
    result.push(groupId)
    data.ingredientGroups?.[groupId]?.parent_groups?.forEach(parentGroupId => setResultParentGroupsOfGroupId(result, parentGroupId))
  }
}


module.exports = router