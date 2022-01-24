import { Router } from 'express'
import controller from '../controllers/requestsDaysOff.controller'
import { IExtendRequest } from '../extends/express'
const val = require('../utils/validators')
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
        const message = req.body.message
        const start = req.body.start
        const end = req.body.end
        const dayOffType = req.body.dayOffType
        const organization = req.body.organization

        !val.isString(message) && res.status(400).send({ message: 'Invalid message' })
        !val.isDate(start) && res.status(400).send({ message: 'Invalid start' })
        !val.isDate(end) && res.status(400).send({ message: 'Invalid end' })
        !val.isNumber(dayOffType) && res.status(400).send({ message: 'Invalid dayOffType' })
        !val.isNumber(organization) && res.status(400).send({ message: 'Invalid organization' })

        controller
            .createRequestDayOff(message, start, end, req.decoded.id, dayOffType, organization)
            .then((requestDayOff) =>
                res
                    .location(req.baseUrl + '/' + String(requestDayOff.id))
                    .status(201)
                    .send({ message: 'Created', requestDayOff: requestDayOff })
            )
            .finally(next)
    })

router
    .route('/:id(\\d+)')
    .get(auth, createdBy, (req, res, next) => {
        controller
            .getRequestDayOff(parseInt(req.params.id))
            .then((requestDayOff) => {
                requestDayOff === 404 && res.status(404).send({ message: 'Not found' })
                res.status(200).send({ message: 'Found', requestDayOff: requestDayOff })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put(auth, role(['admin', 'manager', 'coordinator', 'employee']), createdBy, (req: IExtendRequest, res, next) => {
        const message = req.body.message
        const start = req.body.start
        const end = req.body.end
        const dayOffType = req.body.dayOffType
        const statusRequest = req.body.statusRequest
        const organization = req.body.organization

        message !== undefined && !val.isString(message) && res.status(400).send({ message: 'Invalid message' })
        start !== undefined && !val.isDate(start) && res.status(400).send({ message: 'Invalid start' })
        end !== undefined && !val.isDate(end) && res.status(400).send({ message: 'Invalid end' })
        dayOffType !== undefined && !val.isNumber(dayOffType) && res.status(400).send({ message: 'Invalid dayOffType' })
        statusRequest !== undefined &&
            !val.isNumber(statusRequest) &&
            res.status(400).send({ message: 'Invalid statusRequest' })
        organization !== undefined &&
            !val.isNumber(organization) &&
            res.status(400).send({ message: 'Invalid organization' })

        controller
            .updateRequestDayOff(
                parseInt(req.params.id),
                message ? message : undefined,
                start ? start : undefined,
                end ? end : undefined,
                req.decoded.id,
                dayOffType ? dayOffType : undefined,
                statusRequest ? statusRequest : undefined,
                organization ? organization : undefined
            )
            .then((requestDayOff) => {
                requestDayOff === 404 && res.status(404).send({ message: 'Not found' })
                res.status(201).send({ message: 'Updated', requestDayOff: requestDayOff })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete(auth, createdBy, (req, res, next) => {
        controller
            .deleteRequestDayOff(parseInt(req.params.id))
            .then((requestDayOff) => {
                requestDayOff === 404 && res.status(404).send({ message: 'Not found' })
                res.status(200).send({ message: 'Deleted' })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
