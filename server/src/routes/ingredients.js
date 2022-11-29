const { Router } = require('express')
const Fuse = require('fuse.js')
const router = Router()

const ingredients = require('../data/new/ingredients.json')
const searchableIngredients = ingredients.filter(ing => ing.isSearchable)

const options = {
  // isCaseSensitive: false,
  // includeScore: false,
  shouldSort: true,
  // includeMatches: false,
  findAllMatches: true,
  minMatchCharLength: 1,
  // location: 0,
  threshold: 0.1,
  // distance: 100,
  // useExtendedSearch: false,
  ignoreLocation: false,
  // ignoreFieldNorm: false,
  // fieldNormWeight: 1,
  keys: [
    'name',
    'translation_heb'
  ]
}

const fuse = new Fuse(searchableIngredients, options)

router.get('/', (req, res) => {
  const { query } = req

  let filteredIngredients = []
  if ('ids' in query) {
    filteredIngredients = query.ids.length ? query.ids.split(',').map(id => ingredients.find(ingredient => ingredient.id === id)) : []
  } else if (query?.q?.length) {
    filteredIngredients = fuse.search(query.q).map(i => i.item)
  }


  res.send(filteredIngredients.filter(Boolean))
})


module.exports = router