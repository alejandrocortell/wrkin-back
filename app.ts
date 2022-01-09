require('dotenv').config()
const bodyparser = require('body-parser')
const express = require('express')
const cors = require('cors')
const config = require('./src/config/config')

import router from './src/routes'

const server = express()

const allowedOrigins = ['http://localhost:3000']

server.use(
    cors({
        origin: (origin, callback) => {
            if (!origin) return callback(null, true)
            if (allowedOrigins.indexOf(origin) === -1) {
                const msg =
                    'The CORS policy for this site does not ' +
                    'allow access from the specified Origin.'
                return callback(new Error(msg), false)
            }
            return callback(null, true)
        },
    })
)
server.set('key', config.keyJWT)
server.use(bodyparser.urlencoded({ extended: true }))
server.use(bodyparser.json())
server.use(router)

server.listen(process.env.PORT, () => {
    console.log(`App listening at http://localhost:${process.env.PORT}`)
})
