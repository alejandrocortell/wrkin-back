import { Router } from 'express'
import controller from '../controllers/daysOfftypes.controller'
const val = require('../utils/validators')
const auth = require('../middlewares/authorization')
const role = require('../middlewares/rolePermission')
const router = Router()

router
    .route('/')
    .get(auth, (req, res, next) => {
        controller
            .getDaysOffTypes()
            .then((dayOffType) => res.status(200).send(dayOffType))
            .finally(next)
    })
    .post(auth, role(['admin']), (req, res, next) => {
        const dayOffType = req.body.dayOffType

        !val.isString(dayOffType) && res.status(400).send({ message: 'Invalid dayOffType' })

        controller
            .createDayOffType(dayOffType)
            .then((dayOffType) =>
                res
                    .location(req.baseUrl + '/' + String(dayOffType.id))
                    .status(201)
                    .send({ message: 'Created', dayOffType: dayOffType })
            )
            .finally(next)
    })

router
    .route('/:id(\\d+)')
    .get(auth, (req, res, next) => {
        controller
            .getDayOffType(parseInt(req.params.id))
            .then((dayOffType) => {
                dayOffType === 404 && res.status(404).send({ message: 'Not found' })
                res.status(200).send({ message: 'Found', dayOffType: dayOffType })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put(auth, role(['admin']), (req, res, next) => {
        const dayOffType = req.body.dayOffType

        dayOffType !== undefined && !val.isString(dayOffType) && res.status(400).send({ message: 'Invalid dayOffType' })

        controller
            .updateDayOffType(parseInt(req.params.id), req.body.dayOffType)
            .then((dayOffType) => {
                dayOffType === 404 && res.status(404).send({ message: 'Not found' })
                res.status(201).send({ message: 'Updated', dayOffType: dayOffType })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete(auth, role(['admin']), (req, res, next) => {
        controller
            .deleteDayOffType(parseInt(req.params.id))
            .then((dayOffType) => {
                dayOffType === 404 && res.status(404).send({ message: 'Not found' })
                res.status(200).send({ message: 'Deleted' })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
