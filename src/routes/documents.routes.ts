import { Router } from 'express'
import controller from '../controllers/documents.controller'
const fs = require('fs')
const upload = require('./../middlewares/upload')
const auth = require('../middlewares/authorization')
const role = require('../middlewares/rolePermission')
const sameUser = require('../middlewares/sameUser')
const router = Router()

router
    .route('/')
    .get(auth, role(['admin', 'manager', 'rrhh', 'coordinator']), (req, res, next) => {
        controller
            .getDocuments()
            .then((documents) => res.status(200).send(documents))
            .finally(next)
    })
    .post(auth, upload, (req, res, next) => {
        if (req.file === undefined) {
            res.status(204).send({ message: 'Error, file undefined' })
        }

        controller
            .createDocument(
                req.file.originalname,
                req.file.filename,
                req.file.path,
                +req.body.organization,
                +req.body.user,
                +req.body.documentType
            )
            .then((id) =>
                res
                    .location(req.baseUrl + '/' + String(id))
                    .status(201)
                    .send({ message: 'Successfully uploaded files' })
            )
            .finally(next)
    })

router
    .route('/:id(\\d+)')
    .get(auth, async (req, res, next) => {
        const { nameServer, name } = await controller.getDocument(parseInt(req.params.id))

        res.download(`./uploads/${nameServer}`, name, (err) => {
            if (err) {
                res.status(500).send({
                    message: 'Could not download the file. ' + err,
                })
            }
        })
    })
    .delete(auth, async (req, res, next) => {
        const { nameServer } = await controller.getDocument(parseInt(req.params.id))

        controller
            .deleteDocument(parseInt(req.params.id))
            .then(() => {
                const path = `./uploads/${nameServer}`
                fs.unlink(path, (err) => {
                    if (err) {
                        res.status(204).send({
                            message: 'Could not delete the file. ' + err,
                        })
                    }
                })
                res.status(200).send()
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
