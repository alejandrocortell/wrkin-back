import { Router } from 'express'
import controller from '../controllers/organizations.controller'

const router = Router()

router
    .route('/')
    .get((req, res, next) => {
        controller
            .getOrganizations()
            .then((organizations) => res.status(200).send(organizations))
            .finally(next)
    })
    .post((req, res, next) => {
        controller
            .createOrganization(req.body.organizations)
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
    .get((req, res, next) => {
        controller
            .getOrganization(parseInt(req.params.id))
            .then((organizations) => res.status(200).send(organizations))
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put((req, res, next) => {
        controller
            .updateOrganization(parseInt(req.params.id), req.body.organizations)
            .then(() => res.status(201).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete((req, res, next) => {
        controller
            .deleteOrganization(parseInt(req.params.id))
            .then(() => res.status(200).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
