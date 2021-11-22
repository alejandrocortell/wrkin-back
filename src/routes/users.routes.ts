import { Router } from 'express'
import controller from '../controllers/users.controller'

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
            .createUser(
                req.body.firstName,
                req.body.lastName,
                req.body.birthday,
                req.body.address,
                req.body.zipcode,
                req.body.city,
                req.body.hoursToWork
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
    .get((req, res, next) => {
        controller
            .getUser(parseInt(req.params.id))
            .then((user) => res.status(200).send(user))
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put((req, res, next) => {
        controller
            .updateUser(
                parseInt(req.params.id),
                req.body.firstName ? req.body.firstName : undefined,
                req.body.lastName ? req.body.lastName : undefined,
                req.body.birthday ? req.body.birthday : undefined,
                req.body.address ? req.body.address : undefined,
                req.body.zipcode ? req.body.zipcode : undefined,
                req.body.city ? req.body.city : undefined,
                req.body.hoursToWork ? req.body.hoursToWork : undefined
            )
            .then(() => res.status(201).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete((req, res, next) => {
        controller
            .deleteUser(parseInt(req.params.id))
            .then(() => res.status(200).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })

router.route('/:id(\\d+)/punchins').get((req, res, next) => {
    console.log('---------------')
    controller
        .getPunchIns(parseInt(req.params.id))
        .then((punchIns) => {
            console.log(punchIns)
            res.status(200).send(punchIns)
        })
        .catch(() => res.status(404).send())
        .finally(next)
})

export default router
