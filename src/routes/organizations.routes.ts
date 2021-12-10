import { Router } from 'express'
import controller from '../controllers/organizations.controller'
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
        controller
            .createOrganization(req.body.name)
            .then((id) =>
                res
                    .location(req.baseUrl + '/' + String(id))
                    .status(201)
                    .send()
            )
            .finally(next)
    })

router
    .route('/:id(\\d+)')
    .get(auth, (req, res, next) => {
        controller
            .getOrganization(parseInt(req.params.id))
            .then((organizations) => res.status(200).send(organizations))
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put(auth, role(['admin', 'manager']), (req, res, next) => {
        controller
            .updateOrganization(parseInt(req.params.id), req.body.name)
            .then(() => res.status(201).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete(auth, role(['admin']), (req, res, next) => {
        controller
            .deleteOrganization(parseInt(req.params.id))
            .then(() => res.status(200).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })

router.route('/:id(\\d+)/users').get((req, res, next) => {
    controller
        .getUsers(parseInt(req.params.id))
        .then((users) => {
            res.status(200).send(users)
        })
        .catch(() => res.status(404).send())
        .finally(next)
})

export default router