const _omit = require('lodash/omit')
const { Router } = require('express')
const createHttpError = require('http-errors')

const { getCollectionOperations, getDBId } = require('utils/db')

const menusCollectionOperations = getCollectionOperations('menus')

const router = Router()

router.get('/', async (req, res, next) => {
  try {
    const { kitchens } = req.query

    const aggregation = []
    if (kitchens) {
      aggregation.push({
        $match: { kitchen: { $in: kitchens.split(',') } },
      })
    }
    const menus = await menusCollectionOperations.aggregate(aggregation)

    return res.send(menus)
  } catch (error) {
    const message = `Could not get menus: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.get('/:menuId', async (req, res, next) => {
  const { menuId } = req.params
  try {
    const menu = await menusCollectionOperations.findOne({
      $or: [{ _id: getDBId(menuId) }, { id: menuId }],
    })

    if (!menu) {
      return next(createHttpError(404, `Menu ${menuId} not found`))
    }

    return res.send(menu)
  } catch (error) {
    const message = `Could not get menus: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.post('/', async (req, res, next) => {
  const newMenu = req.body

  try {
    const newId = getDBId()
    const { value: insertedMenu } =
      await menusCollectionOperations.findOneAndReplace(
        { id: newId },
        {
          ...newMenu,
          id: newId.toString(),
          _id: newId,
        },
        { upsert: true }
      )

    return res.status(201).send(insertedMenu)
  } catch (error) {
    const message = `Could not add new menu: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.put('/:menuId', async (req, res, next) => {
  const { menuId } = req.params
  const newMenu = req.body

  try {
    const { value: updatedMenu } =
      await menusCollectionOperations.findOneAndReplace(
        { $or: [{ _id: getDBId(menuId) }, { id: menuId }] },
        _omit(newMenu, '_id')
      )

    return res.send(updatedMenu)
  } catch (error) {
    const message = `Could not update menu ${menuId}: ${error.message}`
    return next(createHttpError(500, message))
  }
})

router.delete('/:menuId', async (req, res, next) => {
  const { menuId } = req.params

  try {
    const { value: deletedMenu } =
      await menusCollectionOperations.findOneAndDelete({
        $or: [{ _id: getDBId(menuId) }, { id: menuId }],
      })

    return res.send(deletedMenu)
  } catch (error) {
    const message = `Could not delete menu ${menuId}: ${error.message}`
    return next(createHttpError(500, message))
  }
})

module.exports = router
