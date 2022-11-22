const path = require('path');
const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { Strategy } = require('passport-local');
const cookieSession = require('cookie-session');

const apiRoutes = require('./routes')
const verifyRouter = require('./routes/verify')

const { getUserById } = require('./utils/users')

const PORT = process.env.PORT || 3001;

const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.ENVIRONMENT,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});


const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// initialize authentication middleware
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, done) => {
  getUserById(id).then((user) => { done(null, user); });
});

passport.use(new Strategy(
  ((id, password, done) => {
    getUserById(id)
      .then((user) => {
        if (user !== null) {
          // if (user.isValidPassword(password)) {
          return done(null, user);
          // }
        }
        return done(null, false);
      });
  }),
));

app.use(cookieSession({
  secret: process.env.COOKIE_SESSION_SECRET,
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRoutes)
app.use('/verify', verifyRouter);

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
