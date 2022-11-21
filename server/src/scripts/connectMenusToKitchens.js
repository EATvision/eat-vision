require('dotenv').config()
require('module-alias/register')

const { getCollectionOperations, connectDb } = require('utils/db')

const menusOperations = getCollectionOperations('menus')
const categoriesOperations = getCollectionOperations('categories')

const main = async () => {
  await connectDb(process.env.DB_URI)

  await menusOperations.updateMany(
    {},
    { $unset: { kitchens: null, dishes: null } }
  )
  const menus = await menusOperations.find({})

  for (const menu of menus) {
    if (!menu.categories) continue
    const category = await categoriesOperations.findOne({
      id: { $in: menu.categories },
    })
    if (!category) continue
    await menusOperations.findOneAndUpdate(
      { id: menu.id },
      { $set: { kitchen: category.kitchen } }
    )
    console.log(`menu ${menu.id} connected to kitchen ${category.kitchen}`)
  }

  process.exit(0)
}

main()
