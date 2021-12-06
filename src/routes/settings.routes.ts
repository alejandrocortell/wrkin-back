import { Router } from 'express'
import controller from '../controllers/settings.controller'
const auth = require('../middlewares/authorization')

const router = Router()

router.route('/').post(auth, (req, res, next) => {
    controller
        .createSettings(req.body.marginHours, req.body.allowModifyPunchIn, req.body.allowInsertPastPunchIn)
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
            .getSettings(parseInt(req.params.id))
            .then((configuration) => res.status(200).send(configuration))
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put(auth, (req, res, next) => {
        controller
            .updateSettings(
                parseInt(req.params.id),
                req.body.marginHours ? req.body.marginHour : undefined,
                req.body.allowModifyPunchIn ? req.body.allowModifyPunchIn : undefined,
                req.body.allowInsertPastPunchIn ? req.body.allowInsertPastPunchIn : undefined
            )
            .then(() => res.status(201).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete(auth, (req, res, next) => {
        controller
            .deleteSettings(parseInt(req.params.id))
            .then(() => res.status(200).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
