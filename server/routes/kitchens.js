const { Router } = require("express");
const router = Router();

const kitchens = require("../data/new/kitchens.json")
const menus = require("../data/new/menus.json")
const dishes = require("../data/new/dishes.json")
const diets = require("../data/new/diets.json")
const categories = require("../data/new/categories.json")

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

router.post("/:kitchenId/menus/:menuId/dishes/search", (req, res) => {
  const { params: { kitchenId, menuId }, body: filters } = req
  res.send({ totalDishes: dishes, filteredDishes: dishes })
});

// const setResultParentGroupsOfGroupId = (result, groupId) => {
//   while (!result.includes(groupId)) {
//     result.push(groupId)
//     data.ingredientGroups?.[groupId]?.parent_groups?.forEach(parentGroupId => setResultParentGroupsOfGroupId(result, parentGroupId))
//   }
// }


module.exports = router