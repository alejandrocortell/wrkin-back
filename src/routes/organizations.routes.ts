import { Router } from 'express'
import controller from '../controllers/organizations.controller'
const val = require('../utils/validators')
const auth = require('../middlewares/authorization')
const role = require('../middlewares/rolePermission')
const router = Router()

router
    .route('/')
    .get(auth, (req, res, next) => {
        controller
            .getOrganizations()
            .then((organizations) => res.status(200).send(organizations))
            .finally(next)
    })
    .post(auth, role(['admin']), (req, res, next) => {
        const name = req.body.name

        !val.isString(name) && res.status(400).send({ message: 'Invalid name' })

        controller
            .createOrganization(name)
            .then((organization) => {
                organization === 404 && res.status(404).send({ message: 'Not found' })

                res.location(req.baseUrl + '/' + String(organization.id))
                    .status(201)
                    .send({ message: 'Created', organization: organization })
            })
            .finally(next)
    })

router
    .route('/:id(\\d+)')
    .get(auth, (req, res, next) => {
        controller
            .getOrganization(parseInt(req.params.id))
            .then((organization) => {
                organization === 404 && res.status(404).send({ message: 'Not found' })
                res.status(200).send({ message: 'Found', organization: organization })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put(auth, role(['admin', 'manager']), (req, res, next) => {
        const name = req.body.name

        name !== undefined && !val.isString(name) && res.status(400).send({ message: 'Invalid name' })

        controller
            .updateOrganization(parseInt(req.params.id), name)
            .then((organization) => {
                organization === 404 && res.status(404).send({ message: 'Not found' })
                res.status(201).send({ message: 'Updated', organization: organization })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete(auth, role(['admin']), (req, res, next) => {
        controller
            .deleteOrganization(parseInt(req.params.id))
            .then((organization) => {
                organization === 404 && res.status(404).send({ message: 'Not found' })
                res.status(200).send({ message: 'Deleted' })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
