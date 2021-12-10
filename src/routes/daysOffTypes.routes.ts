import { Router } from 'express'
import controller from '../controllers/daysOfftypes.controller'
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
        controller
            .createDayOffType(req.body.dayOffType)
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
            .getDayOffType(parseInt(req.params.id))
            .then((dayOffType) => res.status(200).send(dayOffType))
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put(auth, role(['admin']), (req, res, next) => {
        controller
            .updateDayOffType(parseInt(req.params.id), req.body.dayOffType)
            .then(() => res.status(201).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete(auth, role(['admin']), (req, res, next) => {
        controller
            .deleteDayOffType(parseInt(req.params.id))
            .then(() => res.status(200).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
