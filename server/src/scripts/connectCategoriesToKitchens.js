require('dotenv').config()
require('module-alias/register')

const { getCollectionOperations, connectDb } = require('utils/db')

const dishesOperations = getCollectionOperations('dishes')
const categoriesOperations = getCollectionOperations('categories')

const main = async () => {
  await connectDb(process.env.DB_URI)

  await dishesOperations.updateMany({}, { $rename: { kitchenId: 'kitchen' } })

  const dishes = await dishesOperations.find({})

  for (const dish of dishes) {
    if (!dish.categories) continue
    for (const categoryId of dish.categories) {
      await categoriesOperations.findOneAndUpdate(
        { id: categoryId },
        { $set: { kitchen: dish.kitchen } }
      )
      console.log(`category ${categoryId} connected to kitchen ${dish.kitchen}`)
    }
  }

  await categoriesOperations.deleteMany({ kitchen: { $exists: false } })
  console.log('Deleted orphan categories')

  process.exit(0)
}

main()
