require('dotenv').config()
const bodyparser = require('body-parser')
const express = require('express')
const config = require('./src/config/config')

import router from './src/routes'

const server = express()

server.set('key', config.keyJWT)
server.use(bodyparser.urlencoded({ extended: true }))
server.use(bodyparser.json())
server.use(router)

server.listen(process.env.PORT, () => {
    console.log(`App listening at http://localhost:${process.env.PORT}`)
})
