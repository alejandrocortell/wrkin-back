import { Router } from 'express'
import controller from '../controllers/documents.controller'
const val = require('../utils/validators')
const fs = require('fs').promises
const upload = require('./../middlewares/upload')
const auth = require('../middlewares/authorization')
const role = require('../middlewares/rolePermission')
const router = Router()

router
    .route('/')
    .get(
        auth,
        role(['admin', 'manager', 'rrhh', 'coordinator']),
        (req, res, next) => {
            controller
                .getDocuments()
                .then((documents) => res.status(200).send(documents))
                .finally(next)
        }
    )
    .post(auth, upload, (req, res, next) => {
        if (req.file === undefined) {
            res.status(204).send({ message: 'Error, file undefined' })
        }

        const organization = req.body.organization
        const user = req.body.user
        const documentType = req.body.documentType

        !val.isNumber(+organization) &&
            res.status(400).send({ message: 'Invalid organization' })
        user !== undefined &&
            !val.isNumber(+user) &&
            res.status(400).send({ message: 'Invalid user' })
        !val.isNumber(+documentType) &&
            res.status(400).send({ message: 'Invalid documentType' })

        controller
            .createDocument(
                req.file.originalname,
                req.file.filename,
                req.file.path,
                req.body.organization,
                req.body.user,
                req.body.documentType
            )
            .then((document) =>
                res
                    .location(req.baseUrl + '/' + String(document.id))
                    .status(201)
                    .send({ message: 'Successfully uploaded files' })
            )
            .finally(next)
    })

router
    .route('/:id(\\d+)')
    .get(auth, async (req, res, next) => {
        const { nameServer, name } = await controller.getDocument(
            parseInt(req.params.id)
        )

        res.download(`./uploads/${nameServer}`, name, (err) => {
            if (err) {
                res.status(500).send({
                    message: 'Could not download the file. ' + err,
                })
            }
        })
    })
    .delete(auth, async (req, res, next) => {
        const { path } = await controller.getDocument(parseInt(req.params.id))

        if (path === undefined) {
            res.status(400).send({ message: 'Invalid document' })
        }
        controller
            .deleteDocument(parseInt(req.params.id))
            .then((response) => {
                fs.unlink(path)
                res.status(200).send()
            })
            .catch((error) => res.status(404).send({ message: error }))
            .finally(next)
    })

export default router
