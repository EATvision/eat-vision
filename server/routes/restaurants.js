const express = require('express')
const router = express.Router()

const airtable = require('airtable')
const base = airtable.base('appOPszbMpOH0ySIC')

const restaurants = base('tblZl6c3RepInX9BV')
const allRestaurants = restaurants.select({ view: "Grid view"})

router.get('/', (req, res) => {
  allRestaurants.firstPage((err, records) => {
    const names = records.map(r => r.get('name_id'))

    res.send(names)
  })
})

module.exports = router