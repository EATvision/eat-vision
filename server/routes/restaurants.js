const { Router } = require("express");
const router = Router();

const airtable = require('airtable')
const base = airtable.base("appOPszbMpOH0ySIC");

const restaurants = base("tblZl6c3RepInX9BV");
const allRestaurants = restaurants.select({ view: "Grid view" });

router.get("/", (_req, res) => {
  allRestaurants.all((_err, records) => {
    const restaurantsData = records.map((r) => ({
      r_id: r.get("r_id"),
      display_name: r.get("display_name"),
      logo_url: r.get("logo_url"),
      locale: r.get("locale"),
    }));

    res.send(restaurantsData);
  });
});

module.exports = router