require('dotenv').config()
import bodyparser from 'body-parser'
import express from 'express'

import router from './src/routes'

const server = express()

server.use(bodyparser.json())
server.use(router)

server.listen(process.env.PORT, () => {
    console.log(`App listening at http://localhost:${process.env.PORT}`)
})
