const { Router } = require("express");
const router = Router();

const dbClient = require('../db')
const database = dbClient.db('eat');
const customersCollection = database.collection('customers');

router.get("/", async (req, res) => {
  const customer = await customersCollection.findOne()
  res.send(customer);
});

module.exports = router