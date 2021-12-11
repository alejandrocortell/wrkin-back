import { Router } from 'express'
import controller from '../controllers/settings.controller'
const auth = require('../middlewares/authorization')
const role = require('../middlewares/rolePermission')
const sameOrganization = require('../middlewares/sameOrganization')

const router = Router()

router.route('/').post(auth, role(['admin']), (req, res, next) => {
    controller
        .createSettings(
            req.body.marginHours,
            req.body.allowModifyPunchIn,
            req.body.allowInsertPastPunchIn,
            req.body.organizationId
        )
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
    .get(auth, sameOrganization, (req, res, next) => {
        controller
            .getSettings(parseInt(req.params.id))
            .then((configuration) => res.status(200).send(configuration))
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put(auth, role(['admin', 'manager', 'rrhh']), sameOrganization, (req, res, next) => {
        controller
            .updateSettings(
                parseInt(req.params.id),
                req.body.marginHours ? req.body.marginHours : undefined,
                req.body.allowModifyPunchIn !== undefined ? req.body.allowModifyPunchIn : undefined,
                req.body.allowInsertPastPunchIn !== undefined ? req.body.allowInsertPastPunchIn : undefined
            )
            .then(() => res.status(201).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete(auth, role(['admin']), (req, res, next) => {
        controller
            .deleteSettings(parseInt(req.params.id))
            .then(() => res.status(200).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
