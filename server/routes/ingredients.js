const { Router } = require("express");
const Fuse = require('fuse.js')
const router = Router();

const ingredients = require("../data/ingredients.json")

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  // shouldSort: true,
  // includeMatches: false,
  // findAllMatches: false,
  // minMatchCharLength: 1,
  // location: 0,
  // threshold: 0.6,
  // distance: 100,
  // useExtendedSearch: false,
  // ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: [
    "display_name",
  ]
};

const fuse = new Fuse(ingredients, options);

router.get("/", (req, res) => {
  const { query } = req

  console.log(query)

  const filteredIngredients = query?.q?.length
    ? fuse.search(query.q)
    : ingredients.slice(0, 10)

  res.send(filteredIngredients);
});


module.exports = router