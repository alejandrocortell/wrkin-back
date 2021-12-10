import { Router } from 'express'
import controller from '../controllers/statusRequests.controller'
const auth = require('../middlewares/authorization')
const role = require('../middlewares/rolePermission')
const router = Router()

router
    .route('/')
    .get(auth, (req, res, next) => {
        controller
            .getStatusRequests()
            .then((statusRequest) => res.status(200).send(statusRequest))
            .finally(next)
    })
    .post(auth, role(['admin']), (req, res, next) => {
        controller
            .createStatusRequest(req.body.name)
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
            .getStatusRequest(parseInt(req.params.id))
            .then((statusRequest) => res.status(200).send(statusRequest))
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put(auth, role(['admin']), (req, res, next) => {
        controller
            .updateStatusRequest(parseInt(req.params.id), req.body.name)
            .then(() => res.status(201).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete(auth, role(['admin']), (req, res, next) => {
        controller
            .deleteStatusRequest(parseInt(req.params.id))
            .then(() => res.status(200).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
