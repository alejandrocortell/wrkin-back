import { Router } from 'express'
import controller from '../controllers/settings.controller'
const val = require('../utils/validators')
const auth = require('../middlewares/authorization')
const role = require('../middlewares/rolePermission')

const router = Router()

router.route('/').post(auth, role(['admin']), (req, res, next) => {
    const marginHours = req.body.marginHours
    const allowModifyPunchIn = req.body.allowModifyPunchIn
    const allowInsertPastPunchIn = req.body.allowInsertPastPunchIn
    const organizationId = req.body.organizationId

    !val.number(marginHours) &&
        res.status(400).send({ message: 'Invalid marginHours' })
    !val.isBoolean(allowModifyPunchIn) &&
        res.status(400).send({ message: 'Invalid allowModifyPunchIn' })
    !val.isBoolean(allowInsertPastPunchIn) &&
        res.status(400).send({ message: 'Invalid allowInsertPastPunchIn' })
    !val.isNumber(organizationId) &&
        res.status(400).send({ message: 'Invalid organizationId' })

    controller
        .createSettings(
            marginHours,
            allowModifyPunchIn,
            allowInsertPastPunchIn,
            organizationId
        )
        .then((settings) =>
            res
                .location(req.baseUrl + '/' + String(settings.id))
                .status(201)
                .send({ message: 'Created', settings: settings })
        )
        .finally(next)
})

router
    .route('/:id(\\d+)')
    .get(auth, (req, res, next) => {
        controller
            .getSettings(parseInt(req.params.id))
            .then((settings) => {
                settings === 404 &&
                    res.status(404).send({ message: 'Not found' })
                res.status(200).send({ message: 'Found', settings: settings })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put(auth, role(['admin', 'manager']), (req, res, next) => {
        const marginHours = req.body.marginHours
        const allowModifyPunchIn = req.body.allowModifyPunchIn
        const allowInsertPastPunchIn = req.body.allowInsertPastPunchIn

        marginHours !== undefined &&
            !val.isNumber(marginHours) &&
            res.status(400).send({ message: 'Invalid marginHours' })
        allowModifyPunchIn !== undefined &&
            !val.isBoolean(allowModifyPunchIn) &&
            res.status(400).send({ message: 'Invalid allowModifyPunchIn' })
        allowInsertPastPunchIn !== undefined &&
            !val.isBoolean(allowInsertPastPunchIn) &&
            res.status(400).send({ message: 'Invalid allowInsertPastPunchIn' })

        controller
            .updateSettings(
                parseInt(req.params.id),
                marginHours ? marginHours : undefined,
                allowModifyPunchIn !== undefined
                    ? allowModifyPunchIn
                    : undefined,
                allowInsertPastPunchIn !== undefined
                    ? allowInsertPastPunchIn
                    : undefined
            )
            .then((settings) => {
                settings === 404 &&
                    res.status(404).send({ message: 'Not found' })
                res.status(200).send({ message: 'Updated', settings: settings })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete(auth, role(['admin']), (req, res, next) => {
        controller
            .deleteSettings(parseInt(req.params.id))
            .then((settings) => {
                settings === 404 &&
                    res.status(404).send({ message: 'Not found' })
                res.status(200).send()
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
