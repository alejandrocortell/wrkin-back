import { Router } from 'express'
import controller from '../controllers/users.controller'
import { Organization, Role, User } from '../database/models'
const val = require('../utils/validators')
const auth = require('../middlewares/authorization')
const role = require('../middlewares/rolePermission')
const sameUser = require('../middlewares/sameUser')
const uploadAvatar = require('../middlewares/uploadAvatar')
const router = Router()
const path = require('path')

router
    .route('/')
    .get(
        auth,
        role(['admin', 'manager', 'rrhh', 'coordinator']),
        (req, res, next) => {
            controller
                .getUsers()
                .then((users) => res.status(200).send(users))
                .finally(next)
        }
    )
    .post(auth, role(['admin', 'manager', 'rrhh']), async (req, res, next) => {
        const user = req.body.user
        const password = req.body.password
        const firstName = req.body.firstName
        const lastName = req.body.lastName
        const birthday = req.body.birthday
        const address = req.body.address
        const zipcode = req.body.zipcode
        const city = req.body.city
        const role = req.body.role
        const manager = req.body.manager
        const organization = req.body.organization
        const hoursToWork = req.body.hoursToWork

        !val.isString(user) && res.status(400).send({ message: 'Invalid user' })
        !val.isString(password) &&
            res.status(400).send({ message: 'Invalid password' })
        !val.isString(firstName) &&
            res.status(400).send({ message: 'Invalid firstName' })
        !val.isString(lastName) &&
            res.status(400).send({ message: 'Invalid lastName' })
        !val.isDate(birthday) &&
            res.status(400).send({ message: 'Invalid birthday' })
        !val.isString(address) &&
            res.status(400).send({ message: 'Invalid address' })
        !val.isString(zipcode) &&
            res.status(400).send({ message: 'Invalid zipcode' })
        !val.isString(city) && res.status(400).send({ message: 'Invalid city' })
        !val.isNumber(role) && res.status(400).send({ message: 'Invalid role' })
        !val.isNumber(manager) &&
            res.status(400).send({ message: 'Invalid manager' })
        !val.isNumber(organization) &&
            res.status(400).send({ message: 'Invalid organization' })
        !val.isNumber(hoursToWork) &&
            res.status(400).send({ message: 'Invalid hours to work' })

        const foundRole = await Role.findByPk(parseInt(role))
        const foundManager = await User.findByPk(parseInt(manager))
        const foundOrganization = await Organization.findByPk(
            parseInt(organization)
        )

        foundRole === undefined &&
            res.status(400).send({ message: 'Invalid role' })
        foundManager === undefined &&
            res.status(400).send({ message: 'Invalid manager' })
        foundOrganization === undefined &&
            res.status(400).send({ message: 'Invalid manager' })

        controller
            .createUser(
                user,
                password,
                firstName,
                lastName,
                birthday,
                address,
                zipcode,
                city,
                role,
                manager,
                organization,
                hoursToWork
            )
            .then((user) =>
                res
                    .location(req.baseUrl + '/' + String(user.id))
                    .status(201)
                    .send({ message: 'Created', user: user })
            )
            .finally(next)
    })

router.route('/me').get(auth, (req, res, next) => {
    controller
        // @ts-ignore
        .getUser(req.decoded.id)
        .then((user) => {
            user === 404 && res.status(404).send({ message: 'Not found' })
            res.status(200).send({ message: 'Found', user: user })
        })
        .catch(() => res.status(404).send())
        .finally(next)
})

router
    .route('/:id(\\d+)')
    .get(
        auth,
        role(['admin', 'manager', 'rrhh', 'coordinator', 'employee']),
        sameUser,
        (req, res, next) => {
            controller
                .getUser(parseInt(req.params.id))
                .then((user) => {
                    user === 404 &&
                        res.status(404).send({ message: 'Not found' })
                    res.status(200).send({ message: 'Found', user: user })
                })
                .catch(() => res.status(404).send())
                .finally(next)
        }
    )
    .put(
        auth,
        role(['admin', 'manager', 'rrhh', 'employee']),
        sameUser,
        async (req, res, next) => {
            const password = req.body.password
            const firstName = req.body.firstName
            const lastName = req.body.lastName
            const birthday = req.body.birthday
            const address = req.body.address
            const zipcode = req.body.zipcode
            const city = req.body.city
            const role = req.body.role
            const manager = req.body.manager

            password !== undefined &&
                !val.isString(password) &&
                res.status(400).send({ message: 'Invalid password' })
            firstName !== undefined &&
                !val.isString(firstName) &&
                res.status(400).send({ message: 'Invalid firstName' })
            lastName !== undefined &&
                !val.isString(lastName) &&
                res.status(400).send({ message: 'Invalid lastName' })
            birthday !== undefined &&
                !val.isDate(birthday) &&
                res.status(400).send({ message: 'Invalid birthday' })
            address !== undefined &&
                !val.isString(address) &&
                res.status(400).send({ message: 'Invalid address' })
            zipcode !== undefined &&
                !val.isString(zipcode) &&
                res.status(400).send({ message: 'Invalid zipcode' })
            city !== undefined &&
                !val.isString(city) &&
                res.status(400).send({ message: 'Invalid city' })

            const foundRole = await Role.findByPk(parseInt(role))
            const foundManager = await User.findByPk(parseInt(manager))

            foundRole === undefined &&
                res.status(400).send({ message: 'Invalid role' })
            foundManager === undefined &&
                res.status(400).send({ message: 'Invalid manager' })

            controller
                .updateUser(
                    parseInt(req.params.id),
                    password ? password : undefined,
                    firstName ? firstName : undefined,
                    lastName ? lastName : undefined,
                    birthday ? birthday : undefined,
                    address ? address : undefined,
                    zipcode ? zipcode : undefined,
                    city ? city : undefined,
                    role ? role : undefined,
                    manager ? manager : undefined
                )
                .then((user) => {
                    user === 404 &&
                        res.status(404).send({ message: 'Not found' })
                    res.status(201).send({ message: 'Updated', user: user })
                })
                .catch(() => res.status(404).send())
                .finally(next)
        }
    )
    .delete(
        auth,
        role(['admin', 'manager', 'rrhh', 'coordinator']),
        (req, res, next) => {
            controller
                .deleteUser(parseInt(req.params.id))
                .then((user) => {
                    user === 404 &&
                        res.status(404).send({ message: 'Not found' })
                    res.status(200).send()
                })
                .catch(() => res.status(404).send())
                .finally(next)
        }
    )

router
    .route('/:id(\\d+)/upload-avatar')
    .post(
        auth,
        uploadAvatar,
        role(['admin', 'manager', 'rrhh', 'coordinator', 'employee']),
        sameUser,
        (req, res, next) => {
            const avatar = req.file
            const user = parseInt(req.params.id)

            avatar === undefined &&
                res.status(204).send({ message: 'Invalid avatar' })
            !val.isNumber(user) &&
                res.status(400).send({ message: 'Invalid user' })

            controller
                .updateAvatar(user, req.file.filename)
                .then((user) => {
                    res.status(200).send({
                        message: 'updated',
                        user: user,
                    })
                })
                .catch(() => res.status(404).send())
                .finally(next)
        }
    )

router.get('/avatar/:path', (req, res) => {
    res.sendFile(
        path.join(__dirname, `../../uploads/avatar/${req.params.path}`)
    )
})

router
    .route('/:id(\\d+)/punchins')
    .get(
        auth,
        role(['admin', 'manager', 'rrhh', 'coordinator', 'employee']),
        sameUser,
        (req, res, next) => {
            controller
                .getPunchIns(parseInt(req.params.id))
                .then((punchIns) => {
                    res.status(200).send({
                        message: 'success',
                        punchIns: punchIns,
                    })
                })
                .catch((err) => res.status(404).send({ err }))
                .finally(next)
        }
    )

router
    .route('/:id(\\d+)/daysoff')
    .get(
        auth,
        role(['admin', 'manager', 'rrhh', 'coordinator', 'employee']),
        sameUser,
        (req, res, next) => {
            controller
                .getDaysOff(parseInt(req.params.id))
                .then((daysOff) => {
                    res.status(200).send({
                        message: 'success',
                        daysOff: daysOff,
                    })
                })
                .catch(() => res.status(404).send())
                .finally(next)
        }
    )

router
    .route('/:id(\\d+)/documents')
    .get(
        auth,
        role(['admin', 'manager', 'rrhh', 'coordinator', 'employee']),
        sameUser,
        (req, res, next) => {
            controller
                .getDocuments(parseInt(req.params.id))
                .then((documents) => {
                    res.status(200).send({
                        message: 'success',
                        documents: documents,
                    })
                })
                .catch(() => res.status(404).send())
                .finally(next)
        }
    )

export default router
