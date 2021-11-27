const express = require('express')
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) return
    const token = authHeader.split(' ')[1]
    const key = req.app.get('key')

    if (token) {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                return res.json({ message: 'Invalid token' })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        res.send({
            message: 'Token not found',
        })
    }
}

module.exports = auth
