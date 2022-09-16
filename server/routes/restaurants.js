const { Router } = require("express");
const router = Router();

const restaurants = require("../data/old/restaurants.json")
const menus = require("../data/old/menus.json")
const dishes = require("../data/old/dishes.json")
const diets = require("../data/old/diets.json")
const categories = require("../data/old/categories.json")

router.get("/", (_req, res) => {
  res.send(restaurants);
});

router.get("/:restaurantId", (req, res) => {
  const { params: { restaurantId } } = req
  res.send(restaurants.find(restaurant => restaurant.id === restaurantId))
});

router.get("/:restaurantId/categories", (req, res) => {
  res.send(categories)
});

router.get("/:restaurantId/menus", (req, res) => {
  const { params: { restaurantId } } = req

  const relevanceMenus = menus.filter(menu => menu?.restaurants?.includes(restaurantId))
  res.send(relevanceMenus)
});

router.post("/:restaurantId/menus/:menuId/dishes/search", (req, res) => {
  const { params: { restaurantId, menuId }, body: filters } = req
  res.send({ totalDishes: dishes, filteredDishes: dishes })
});

// const setResultParentGroupsOfGroupId = (result, groupId) => {
//   while (!result.includes(groupId)) {
//     result.push(groupId)
//     data.ingredientGroups?.[groupId]?.parent_groups?.forEach(parentGroupId => setResultParentGroupsOfGroupId(result, parentGroupId))
//   }
// }


module.exports = router