const fs = require('fs')
const JSONStream = require('JSONStream')

const airtable = require('airtable')
airtable.configure({
  endpointUrl: 'https://api.airtable.com',
  apiKey: process.env.AIRTABLE_API_KEY,
})

const base = airtable.base('appOPszbMpOH0ySIC')

//kitchens
let kitchens = []
base('tblZl6c3RepInX9BV')
  .select({ view: 'Grid view' })
  .all((_err, records) => {
    const data = records.map((r) => ({
      id: r.getId(),
      name: r.get('display_name'),
      image: r.get('image'),
      website: r.get('site_url'),
      intentions: r.get('intentions'),
      location: r.get('location'),
      workingHours: r.get('working_hours'),
      menus: r.get('Menus'),
      currency: r.get('currency'),
      locale: r.get('locale'),
    }))
    kitchens = data
    fs.writeFileSync('./src/data/raw/kitchens.json', JSON.stringify(kitchens))
    console.log('finished kitchens')
  })

//locations
let locations = []
base('tblNdngecQWNjn6E0')
  .select({ view: 'Grid view' })
  .all((_err, records) => {
    const data = records.map((r) => ({
      id: r.getId(),
      country: r.get('country'),
      city: r.get('city'),
      streetAddress: r.get('street_address'),
      postCode: r.get('post_code'),
      kithen: r.get('Restaurant'),
    }))
    locations = data
    fs.writeFileSync(
      './src/data/raw/locations.json',
      JSON.stringify(locations)
    )
    console.log('finished locations')
  })

//menus
let menus = []
base('tbl9JON90N2fzyNik')
  .select({ view: 'Grid view' })
  .all((_err, records) => {
    const data = records.map((r) => ({
      id: r.getId(),
      kitchens: r.get('restaurants'),
      name: r.get('display_name'),
      description: r.get('description'),
      workingHours: r.get('working_hours'),
      startDate: r.get('start_date'),
      endDate: r.get('end_date'),
      categories: r.get('categories'),
      dishes: r.get('Dishes'),
    }))
    menus = data
    fs.writeFileSync('./src/data/raw/menus.json', JSON.stringify(menus))
    console.log('finished menus')
  })

//categories
let categories = []
base('tblkCqIh4FIs6rVXE')
  .select({ view: 'Grid view' })
  .all((_err, records) => {
    const data = records.map((r) => ({
      id: r.getId(),
      name: r.get('display_name'),
      position: r.get('position'),
      dishes: r.get('Dishes'),
      description: r.get('description'),
    }))
    categories = data
    fs.writeFileSync(
      './src/data/raw/categories.json',
      JSON.stringify(categories)
    )
    console.log('finished categories')
  })

//workingHours
let working_hours = []
base('tbl6IbHA11rj3xQ4r')
  .select({ view: 'Grid view' })
  .all((_err, records) => {
    const data = records.map((r) => ({
      id: r.getId(),
      day: r.get('day'),
      start: r.get('start'),
      end: r.get('end'),
    }))
    working_hours = data
    fs.writeFileSync(
      './src/data/raw/working_hours.json',
      JSON.stringify(working_hours)
    )
    console.log('finished working_hours')
  })

//ingredients
let ingredients = []
base('tblotwNoQ0o3H0zVN')
  .select({ view: 'Grid view' })
  .all((_err, records) => {
    const data = records.map((r) => ({
      id: r.getId(),
      name: r.get('display_name'),
      subIngredients: r.get('sub_ingredients'),
      isSearchable: r.get('is_searchable'),
      description: r.get('description'),
      synonyms: r.get('synonyms'),
      tags: r.get('ingrediet_tags'),
      groups: r.get('Groups'),
      translation_heb: r.get('translation_heb'),
    }))
    ingredients = data
    const transformStream = JSONStream.stringify()
    const outputStream = fs.createWriteStream(
      './src/data/raw/ingredients.json'
    )
    transformStream.pipe(outputStream)
    ingredients.forEach(transformStream.write)
    transformStream.end()

    outputStream.on('finish', function handleFinish() {
      console.log('finished ingredients')
    })
  })

// foodGroups tblya8ylojdR69Sbm
let foodGroups = []
base('tblya8ylojdR69Sbm')
  .select({ view: 'Grid view' })
  .all((_err, records) => {
    const data = records.map((r) => ({
      id: r.getId(),
      name: r.get('display_name'),
      translation_heb: r.get('translation_heb'),
      subGroups: r.get('sub_groups'),
      parentGroups: r.get('parent_groups'),
    }))
    foodGroups = data
    const transformStream = JSONStream.stringify()
    const outputStream = fs.createWriteStream('./src/data/raw/foodGroups.json')
    transformStream.pipe(outputStream)
    foodGroups.forEach(transformStream.write)
    transformStream.end()

    outputStream.on('finish', function handleFinish() {
      console.log('finished foodGroups')
    })
  })

//sizes
let sizes = []
base('tblGbdDm36AXYWlSM')
  .select({ view: 'Grid view' })
  .all((_err, records) => {
    const data = records.map((r) => ({
      id: r.getId(),
      smallest_size_name: r.get('smallest_size_name')?.trim(),
      smallest_price: r.get('smallest_price'),
      '2nd_size_name': r.get('2nd_size_name')?.trim(),
      '2nd_size_price': r.get('2nd_size_price'),
      '3rd_size_name': r.get('3rd_size_name')?.trim(),
      '3rd_size_price': r.get('3rd_size_price'),
    }))
    sizes = data
    const transformStream = JSONStream.stringify()
    const outputStream = fs.createWriteStream('./src/data/raw/sizes.json')
    transformStream.pipe(outputStream)
    sizes.forEach(transformStream.write)
    transformStream.end()

    outputStream.on('finish', function handleFinish() {
      console.log('finished sizes')
    })
  })


//dishes
let dishes = []
base('tblLnh1hSZ8GTznfy')
  .select({ view: 'Grid view' })
  .all((_err, records) => {
    const data = records.map((r) => ({
      id: r.getId(),
      name: r.get('Dish_display_name'),
      description: r.get('short_description'),
      longDescription: r.get('long_description'),
      image: r.get('image_url'),
      category: r.get('category'),
      composition: r.get('recipe'),
      price: r.get('Price'),
      kitchenIds: r.get('kitchenId'),
      dishType: r.get('Dish_type'),
      sizes: r.get('sizes'),
    }))
    dishes = data
    const transformStream = JSONStream.stringify()
    const outputStream = fs.createWriteStream('./src/data/raw/dishes.json')
    transformStream.pipe(outputStream)
    dishes.forEach(transformStream.write)
    transformStream.end()

    outputStream.on('finish', function handleFinish() {
      console.log('finished dishes')
    })
  })

//compositions
let compositions = []
base('tblrTZOqWSoDnXJK4')
  .select({ view: 'Grid view' })
  .all((_err, records) => {
    const data = records.map((r) => ({
      id: r.getId(),
      mandatory_ingredients: r.get('mandatory_ingredients_'),
      excludable_ingredients: r.get('excludable_ingredients'),
      putaside_ingredients: r.get('putaside_ingredients'),
      Choice_ingredients: r.get('Choice_ingredients'),
      Choice_side_dish: r.get('Choice_side_dish'),
      addable_ingridients: r.get('addable_ingridients'),
      addable_dishs: r.get('addable_dishs'),
    }))
    compositions = data
    fs.writeFileSync('./src/data/raw/compositions.json', JSON.stringify(compositions))
    console.log('finished compositions')

  })

//choices_ingredients
let choices_ingredients = []
base('tbl8Mk37Xtrc6kgyG')
  .select({ view: 'Grid view' })
  .all((_err, records) => {
    const data = records.map((r) => ({
      id: r.getId(),
      ingredient1: r.get('ingredient1'),
      ingredient1_delta_price: r.get('ingredient1_delta_price'),
      ingredient2: r.get('ingredient2'),
      ingredient2_delta_price: r.get('ingredient2_delta_price'),
      ingredient3: r.get('ingredient3'),
      ingredient3_delta_price: r.get('ingredient3_delta_price'),
      ingredient4: r.get('ingredient4'),
      ingredient4_delta_price: r.get('ingredient4_delta_price'),
      ingredient5: r.get('ingredient5'),
      ingredient5_delta_price: r.get('ingredient5_delta_price'),
    }))
    choices_ingredients = data
    fs.writeFileSync(
      './src/data/raw/choices_ingredients.json',
      JSON.stringify(choices_ingredients)
    )
    console.log('finished choices_ingredients')
  })

//choices_subdishes
let choices_subdishes = []
base('tblSOWhCrvbHioMVL')
  .select({ view: 'Grid view' })
  .all((_err, records) => {
    const data = records.map((r) => ({
      id: r.getId(),
      primer_dishs: r.get('primer_dishs'),
      Dish1: r.get('Dish1'),
      Dish1_delta_price: r.get('Dish1_delta_price'),
      Dish2: r.get('Dish2'),
      Dish2_delta_price: r.get('Dish2_delta_price'),
      Dish3: r.get('Dish3'),
      Dish3_delta_price: r.get('Dish3_delta_price'),
      Dish4: r.get('Dish4'),
      Dish4_delta_price: r.get('Dish4_delta_price'),
      Dish5: r.get('Dish5'),
      Dish5_delta_price: r.get('Dish5_delta_price'),
      Dish6: r.get('Dish6'),
      Dish6_delta_price: r.get('Dish6_delta_price'),
    }))
    choices_subdishes = data
    fs.writeFileSync(
      './src/data/raw/choices_subdishes.json',
      JSON.stringify(choices_subdishes)
    )
    console.log('finished choices_subdishes')
  })

//diets
let diets = []
base('tblJXmaeTIA7dp4oJ')
  .select({ view: 'Grid view' })
  .all((_err, records) => {
    const data = records.map((r) => ({
      id: r.getId(),
      name: r.get('name'),
      translation_heb: r.get('translation_heb'),
      excluded_groups: r.get('excluded_groups'),
    }))
    diets = data
    fs.writeFileSync('./src/data/raw/diets.json', JSON.stringify(diets))
    console.log('finished diets')
  })

//allergens
let allergens = []
base('tbl0tb3niAgusE64c')
  .select({ view: 'Grid view' })
  .all((_err, records) => {
    const data = records.map((r) => ({
      id: r.getId(),
      name: r.get('name'),
      translation_heb: r.get('translation_heb'),
      groups: r.get('Groups'),
    }))
    allergens = data
    fs.writeFileSync('./src/data/raw/allergens.json', JSON.stringify(allergens))
    console.log('finished allergens')
  })
