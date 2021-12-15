import { Router } from 'express'
import controller from '../controllers/requestsDaysOff.controller'
import { IExtendRequest } from '../extends/express'
const auth = require('../middlewares/authorization')
const role = require('../middlewares/rolePermission')
const createdBy = require('../middlewares/createdBy')
const router = Router()

router
    .route('/')
    .get(auth, role(['admin', 'manager', 'rrhh', 'coordinator']), (req, res, next) => {
        controller
            .getRequestsDaysOff()
            .then((requestDayOffs) => res.status(200).send(requestDayOffs))
            .finally(next)
    })
    .post(auth, (req: IExtendRequest, res, next) => {
        controller
            .createRequestDayOff(req.body.message, req.body.start, req.body.end, req.decoded.id, req.body.dayOffType)
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
    .get(auth, createdBy, (req, res, next) => {
        controller
            .getRequestDayOff(parseInt(req.params.id))
            .then((requestDayOff) => res.status(200).send(requestDayOff))
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put(auth, role(['admin', 'manager', 'coordinator', 'employee']), createdBy, (req: IExtendRequest, res, next) => {
        controller
            .updateRequestDayOff(
                parseInt(req.params.id),
                req.body.statusRequest ? req.body.statusRequest : undefined,
                req.body.start ? req.body.start : undefined,
                req.body.end ? req.body.end : undefined,
                req.decoded.id,
                req.body.dayOffType ? req.body.dayOffType : undefined,
                req.body.statusRequest ? req.body.statusRequest : undefined
            )
            .then(() => res.status(201).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete(auth, createdBy, (req, res, next) => {
        controller
            .deleteRequestDayOff(parseInt(req.params.id))
            .then(() => res.status(200).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
