import { User } from '../database/models'
import { decode } from './../utils/cryptoJS'

const jwt = require('jsonwebtoken')

async function getToken(req, res): Promise<void> {
    const user = await User.findAll({
        where: {
            user: req.body.user,
        },
        attributes: ['user', 'password'],
    })

    if (user.length !== 1 || decode(user[0].password) !== req.body.password) {
        return res.json({ message: 'User or password incorrects' })
    } else {
        const key = req.app.get('key')
        const payload = {
            check: true,
        }
        const token = jwt.sign(payload, key, {
            expiresIn: 1440,
        })
        return res.json({
            message: 'Correct authorization',
            token: token,
        })
    }
}

export default {
    getToken,
}
