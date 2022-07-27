
const express = require('express')

const restaurantsRoutes = require('./restaurants')

const router = express.Router()

router.use('/restaurants', restaurantsRoutes)

router.get("/", (req, res) => {
  res.json({ message: "OK" });
});



module.exports = router