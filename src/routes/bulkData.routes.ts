import { Router } from 'express'
import controller from '../controllers/bulkData.controller'

const router = Router()

router
    .route('/')
    .post((req, res, next) => {
        controller
            .bulkData()
            .then(() => res.status(200).send())
            .finally(next)
    })
    .delete((req, res, next) => {
        controller
            .destroyData()
            .then(() => res.status(200).send())
            .finally(next)
    })

export default router
