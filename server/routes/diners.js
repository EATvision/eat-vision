const { Router } = require("express");
const router = Router();

const dbClient = require('../db')
const database = dbClient.db('eat');
const dinersCollection = database.collection('diners');

router.get("/", async (req, res) => {
  const diner = await dinersCollection.findOne()
  res.send(diner);
});

module.exports = router