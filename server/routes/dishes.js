const { Router } = require("express");
const Fuse = require('fuse.js')
const router = Router();

const dbClient = require('../db')
const dishesCollection = dbClient?.db('eat').collection('dishes');

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
    "name",
  ]
};


router.get("/", async (req, res) => {
  const { query } = req

  const searchableDishes = await dishesCollection.find({}).toArray()

  const fuse = new Fuse(searchableDishes, options);

  let filteredDishes = searchableDishes.slice(0, 10)
  if ('ids' in query) {
    filteredDishes = query.ids.length ? query.ids.split(',').map(id => searchableDishes.find(d => d.id === id)) : []
  } else if (query?.q?.length) {
    filteredDishes = fuse.search(query.q).map(i => i.item)
  }

  res.send(filteredDishes);
});

router.post("/", async (req, res) => {
  const { body } = req

  await dishesCollection.insertOne(body)

  res.status(201);
});



module.exports = router