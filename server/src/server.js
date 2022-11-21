const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const errorHandler = require('middlewares/errorHandler')
const morganMiddleware = require('middlewares/morganMiddleware')
const passportMiddleware = require('middlewares/passportMiddleware')

const apiRoutes = require('routes/index')
const verifyRoutes = require('routes/verify')
const apiV2Routes = require('routes/v2/index')

const logger = require('utils/logger')
const { connectDb } = require('utils/db')

const PORT = process.env.PORT || 3001
const mongoURI = process.env.DB_URI

const createServer = () => {
  const app = express()

  app.use(express.json())
  app.use(cookieParser())
  app.use(bodyParser.raw())
  app.use(bodyParser.json())
  app.use(express.urlencoded({ extended: true }))

  if (process.env.NODE_ENV !== 'test') app.use(morganMiddleware)
  app.use(passportMiddleware())

  app.use('/api', apiRoutes)
  app.use('/api/v2', apiV2Routes)
  app.use('/verify', verifyRoutes)

  app.use(express.static(path.resolve(__dirname, '../../client/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../client/build', 'index.html'))
  })

  app.use(errorHandler)

  return app
}

const init = async () => {
  await connectDb(mongoURI)

  const app = createServer()

  app.listen(PORT, () => {
    logger.debug(`listening on port ${PORT}`)
  })
}

module.exports = {
  init,
  connectDb,
  createServer,
}
