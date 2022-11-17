require('dotenv').config()
require('module-alias/register')

const server = require('src/server')

server.init()
