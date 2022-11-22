require('dotenv').config()
require('module-alias/register')

const server = require('src/server')
const Sentry = require("@sentry/node")
const Tracing = require("@sentry/tracing")


Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.ENVIRONMENT,

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

server.init()
