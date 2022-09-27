const { Router } = require("express");
const router = Router();

const dbClient = require('../db')
const dinersCollection = dbClient?.db('eat').collection('diners');

router.post("/anonymous", async (req, res) => {
  const { body: { filters } } = req
  const anonymousDiner = { filters }
  // const response = await dinersCollection?.insertOne(anonymousDiner)
  res.status(201);
});

module.exports = router