const logger = require('utils/logger')

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  logger.error(error.message)
  res.status(error.status).json({
    status: error.name,
    statusCode: error.status,
    message: error.message,
  })
}

module.exports = errorHandler
