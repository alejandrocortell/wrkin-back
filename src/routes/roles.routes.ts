import { Router } from 'express'
import controller from '../controllers/roles.controller'
const val = require('../utils/validators')
const auth = require('../middlewares/authorization')
const role = require('../middlewares/rolePermission')
const router = Router()

router
    .route('/')
    .get(auth, (req, res, next) => {
        controller
            .getRoles()
            .then((role) => res.status(200).send(role))
            .finally(next)
    })
    .post(auth, role(['admin']), (req, res, next) => {
        const name = req.body.name

        !val.isString(name) && res.status(400).send({ message: 'Invalid name' })

        controller
            .createRole(name)
            .then((role) =>
                res
                    .location(req.baseUrl + '/' + String(role.id))
                    .status(201)
                    .send({ message: 'Created', role: role })
            )
            .finally(next)
    })

router
    .route('/:id(\\d+)')
    .get(auth, (req, res, next) => {
        controller
            .getRole(parseInt(req.params.id))
            .then((role) => {
                role === 404 && res.status(404).send({ message: 'Not found' })
                res.status(200).send({ message: 'Found', role: role })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put(auth, role(['admin']), (req, res, next) => {
        const name = req.body.name

        name !== undefined && !val.isString(name) && res.status(400).send({ message: 'Invalid name' })

        controller
            .updateRole(parseInt(req.params.id), name)
            .then((role) => {
                role === 404 && res.status(404).send({ message: 'Not found' })
                res.status(200).send({ message: 'Updated', role: role })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete(auth, role(['admin']), (req, res, next) => {
        controller
            .deleteRole(parseInt(req.params.id))
            .then((role) => {
                role === 404 && res.status(404).send({ message: 'Not found' })
                res.status(200).send({ message: 'Deleted' })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
