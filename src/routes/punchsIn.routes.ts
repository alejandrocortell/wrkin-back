import { Router } from 'express'
import controller from '../controllers/punchsIn.controller'
const auth = require('../middlewares/authorization')

const router = Router()

router
    .route('/')
    .get(auth, (req, res, next) => {
        controller
            .getPunchsIn()
            .then((punchIn) => res.status(200).send(punchIn))
            .finally(next)
    })
    .post(auth, (req, res, next) => {
        controller
            .createPunchIn(req.body.start, req.body.end, req.body.user)
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
            .getPunchIn(parseInt(req.params.id))
            .then((punchIn) => res.status(200).send(punchIn))
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put(auth, (req, res, next) => {
        controller
            .updatePunchIn(
                parseInt(req.params.id),
                req.body.start ? req.body.start : undefined,
                req.body.end ? req.body.end : undefined,
                req.body.user ? req.body.user : undefined
            )
            .then(() => res.status(201).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete(auth, (req, res, next) => {
        controller
            .deletePunchIn(parseInt(req.params.id))
            .then(() => res.status(200).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
