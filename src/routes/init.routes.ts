import { Router } from 'express'
import controller from '../controllers/init.controller'
const val = require('../utils/validators')

const router = Router()

router.route('/').post((req, res, next) => {
    const organization = req.body.organization
    const manager = req.body.manager
    const password = req.body.password

    !val.isString(organization) &&
        res.status(400).send({ message: 'Invalid organization' })
    !val.isString(manager) &&
        res.status(400).send({ message: 'Invalid manager' })
    !val.isString(password) &&
        res.status(400).send({ message: 'Invalid password' })

    controller
        .initData(organization, manager, password)
        .then(() => res.status(200).send({ message: 'Created' }))
        .finally(next)
})

export default router
