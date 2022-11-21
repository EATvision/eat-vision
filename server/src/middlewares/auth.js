const jwt = require('jsonwebtoken')

const authenticateToken = (options = { throwOnFail: false }) => (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null && !options.throwOnFail) {
    req.user = null
    return next()
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err && options.throwOnFail) return res.sendStatus(403)

    req.user = user

    next()
  })
}

module.exports = authenticateToken