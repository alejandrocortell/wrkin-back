const { Router } = require('express')
const router = Router()
import controller from '../controllers/authorization.controller'

router.route('/').post((req, res, next) => {
    controller
        .getToken(req, res)
        .then((response) => res.status(200).send(response))
        .catch(() => res.status(404).send())
        .finally(next)
})

export default router
