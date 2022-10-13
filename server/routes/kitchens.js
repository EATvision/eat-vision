const { Router } = require("express");
const router = Router();

const kitchens = require("../data/new/kitchens.json")
const menus = require("../data/new/menus.json")
const dishes = require("../data/new/dishes.json")
const categories = require("../data/new/categories.json")

const { getModifiedDishes } = require("../utils/dishes");


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

module.exports = router