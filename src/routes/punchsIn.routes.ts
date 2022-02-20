import { Router } from 'express'
import controller from '../controllers/punchsIn.controller'
import { IExtendRequest } from '../extends/express'
const val = require('../utils/validators')
const auth = require('../middlewares/authorization')
const role = require('../middlewares/rolePermission')
const createdBy = require('../middlewares/createdBy')
const router = Router()

router
    .route('/')
    .get(
        auth,
        role(['admin', 'manager', 'rrhh', 'coordinator']),
        (req, res, next) => {
            controller
                .getPunchsIn()
                .then((punchIn) => res.status(200).send(punchIn))
                .finally(next)
        }
    )
    .post(auth, (req: IExtendRequest, res, next) => {
        const start = req.body.start
        const end = req.body.end

        !val.isDate(start) && res.status(400).send({ message: 'Invalid start' })
        if (end !== undefined && !val.isDate(end)) {
            res.status(400).send({ message: 'Invalid end' })
        }

        controller
            .createPunchIn(start, end, req.decoded.id)
            .then((punchIn) =>
                res
                    .location(req.baseUrl + '/' + String(punchIn.id))
                    .status(201)
                    .send({ message: 'Created', punchIn: punchIn })
            )
            .finally(next)
    })

router
    .route('/:id(\\d+)')
    .get(auth, createdBy, (req, res, next) => {
        controller
            .getPunchIn(parseInt(req.params.id))
            .then((punchIn) => {
                punchIn === 404 &&
                    res.status(404).send({ message: 'Not found' })
                res.status(200).send({ message: 'Found', punchIn: punchIn })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put(
        auth,
        role(['admin', 'manager', 'coordinator', 'employee']),
        createdBy,
        (req: IExtendRequest, res, next) => {
            const start = req.body.start
            const end = req.body.end
            const organization = req.body.organization

            start !== undefined &&
                !val.isDate(start) &&
                res.status(400).send({ message: 'Invalid start' })
            end !== undefined &&
                !val.isDate(end) &&
                res.status(400).send({ message: 'Invalid end' })
            organization !== undefined &&
                !val.isNumber(organization) &&
                res.status(400).send({ message: 'Invalid organization' })

            controller
                .updatePunchIn(
                    parseInt(req.params.id),
                    start ? start : undefined,
                    end ? end : undefined,
                    req.decoded.id
                )
                .then((punchIn) => {
                    punchIn === 404 &&
                        res.status(404).send({ message: 'Not found' })
                    res.status(200).send({
                        message: 'Updated',
                        punchIn: punchIn,
                    })
                })
                .catch(() => res.status(404).send())
                .finally(next)
        }
    )
    .delete(auth, createdBy, (req, res, next) => {
        controller
            .deletePunchIn(parseInt(req.params.id))
            .then((punchIn) => {
                punchIn === 404 &&
                    res.status(404).send({ message: 'Not found' })
                res.status(200).send({ message: 'Deleted' })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
