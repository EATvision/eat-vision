const passport = require('passport')
const { Strategy } = require('passport-local')
const cookieSession = require('cookie-session')

const { getUserById } = require('utils/users')

passport.use(
  new Strategy((id, password, done) => {
    getUserById(id).then((user) => {
      if (user !== null) {
        // if (user.isValidPassword(password)) {
        return done(null, user)
        // }
      }
      return done(null, false)
    })
  })
)

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser((id, done) => {
  getUserById(id).then((user) => {
    done(null, user)
  })
})

module.exports = () => [
  cookieSession({
    secret: process.env.COOKIE_SESSION_SECRET,
  }),
  passport.initialize(),
  passport.session(),
]
