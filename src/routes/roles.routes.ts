import { Router } from 'express'
import controller from '../controllers/roles.controller'

const router = Router()

router
    .route('/')
    .get((req, res, next) => {
        controller
            .getRoles()
            .then((role) => res.status(200).send(role))
            .finally(next)
    })
    .post((req, res, next) => {
        controller
            .createRole(req.body.name)
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
            .getRole(parseInt(req.params.id))
            .then((role) => res.status(200).send(role))
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put((req, res, next) => {
        controller
            .updateRole(parseInt(req.params.id), req.body.name)
            .then(() => res.status(201).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete((req, res, next) => {
        controller
            .deleteRole(parseInt(req.params.id))
            .then(() => res.status(200).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
