const express = require('express')
const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization

    if (!authHeader) {
        res.status(404).send({
            message: 'Token not found',
        })
    }
    const token = authHeader.split(' ')[1]
    const key = req.app.get('key')

    if (token) {
        jwt.verify(token, key, (err, decoded) => {
            if (err) {
                res.status(203).json({ message: 'Invalid token' })
            } else {
                req.decoded = decoded
                next()
            }
        })
    } else {
        res.status(404).send({ message: 'Token not found' })
    }
}

module.exports = auth
