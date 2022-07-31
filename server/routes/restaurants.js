const { Router } = require("express");
const router = Router();

const airtable = require('airtable')
const base = airtable.base("appOPszbMpOH0ySIC");

const restaurants = base("tblZl6c3RepInX9BV");
const allRestaurants = restaurants.select({ view: "Grid view" });

router.get("/", (_req, res) => {
  allRestaurants.all((_err, records) => {
    const restaurantsData = records.map((r) => ({
      id: r.id,
      display_name: r.get("display_name"),
      logo_url: r.get("logo_url"),
      locale: r.get("locale"),
    }));

    res.send(restaurantsData);
  });
});

router.get("/:restaurantId", (req, res) => {
  const { params: { restaurantId } } = req

  restaurants
  .select({ view: "Grid view" })
  .all((_err, records) => {
    const restaurantData = records.find(r => (r.id === restaurantId));
    
    res.send({
      id: restaurantData.id,
      display_name: restaurantData.get("display_name"),
      logo_url: restaurantData.get("logo_url"),
      locale: restaurantData.get("locale"),
    })

  }, function done(error) {
  })
});

router.get("/:restaurantId/menus", (req, res) => {
  const { params: { restaurantId } } = req

  const menus = base("tbl9JON90N2fzyNik")

  menus.select({ view: "Grid view" }).all((err, records) => {
    if (err) { console.error(err); return; }

    const relevanceMenus = records.reduce((result, record) => {
      if (record.get('restaurants') && record.get('restaurants').includes(restaurantId)) {
        return [ ...result, {
          id: record.id,
          dishes: record.get('Dishes')
        }]
      }
      return result
  }, []);

    res.send(relevanceMenus)
  })
});

router.get("/:restaurantId/menus/:menuId/dishes/search", (req, res) => {
  const { params: { restaurantId, menuId }, body: filters } = req

  const dishes = base("tblVODysxidY4YSJy")
  // const ingredients = base('tblygXPmVmWOVn2af')
  
  // ingredients.select({ view: "Grid view" }).all((err, ingredientsRecords) => {
  //       if (err) { console.error(err); return; }
  // })

  dishes.select({ view: "Grid view" }).all((err, dishesRecords) => {
    if (err) { console.error(err); return; }

          const relevantDishes = dishesRecords.reduce((result, disheRecord) => {
            if (
              disheRecord.get('restaurants') && disheRecord.get('restaurants').includes(restaurantId) &&
              disheRecord.get('menus') && disheRecord.get('menus').includes(menuId)      
            ) {
              return [ ...result, {
                id: disheRecord.id,
                ingredients: disheRecord.get('ingredients(mandatory)')
              }]
            }
            return result
        }, []);
        res.send(relevantDishes)
    })  
});

module.exports = router