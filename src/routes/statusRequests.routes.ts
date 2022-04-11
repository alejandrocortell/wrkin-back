import { Router } from 'express'
import controller from '../controllers/statusRequests.controller'
const val = require('../utils/validators')
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
        const statusRequest = req.body.statusRequest

        !val.isString(statusRequest) && res.status(400).send({ message: 'Invalid statusRequest' })

        controller
            .createStatusRequest(statusRequest)
            .then((statusRequest) =>
                res
                    .location(req.baseUrl + '/' + String(statusRequest.id))
                    .status(201)
                    .send({ message: 'Created', statusRequest: statusRequest })
            )
            .finally(next)
    })

router
    .route('/:id(\\d+)')
    .get(auth, (req, res, next) => {
        controller
            .getStatusRequest(parseInt(req.params.id))
            .then((statusRequest) => {
                statusRequest === 404 && res.status(404).send({ message: 'Not found' })
                res.status(200).send({ message: 'Found', statusRequest: statusRequest })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put(auth, role(['admin']), (req, res, next) => {
        const statusRequest = req.body.statusRequest

        !val.isString(statusRequest) && res.status(400).send({ message: 'Invalid statusRequest' })

        controller
            .updateStatusRequest(parseInt(req.params.id), statusRequest)
            .then((statusRequest) => {
                statusRequest === 404 && res.status(404).send({ message: 'Not found' })
                res.status(201).send({ message: 'Updated', statusRequest: statusRequest })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete(auth, role(['admin']), (req, res, next) => {
        controller
            .deleteStatusRequest(parseInt(req.params.id))
            .then((statusRequest) => {
                statusRequest === 404 && res.status(404).send({ message: 'Not found' })
                res.status(200).send({ message: 'Deleted' })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
