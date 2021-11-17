import { Router } from 'express'
import controller from '../controllers/testController'

const router = Router()

router
    .route('/')
    .get((req, res, next) => {
        controller
            .getUsers()
            .then((users) => res.status(200).send(users))
            .finally(next)
    })
    .post((req, res, next) => {
        controller
            .createUser(req.body.firstName, req.body.lastName)
            .then((id) =>
                res
                    .location(req.baseUrl + '/' + String(id))
                    .status(201)
                    .send()
            )
            .finally(next)
    })

export default router
