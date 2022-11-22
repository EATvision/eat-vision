require('dotenv').config()
require('module-alias/register')

const server = require('src/server')
const Sentry = require("@sentry/node")
const Tracing = require("@sentry/tracing")


Sentry.init({
  dsn: "https://a89344f4de9b4f49b13683a9544538c6@o4504174016069632.ingest.sentry.io/4504189512843264",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})

server.init()
