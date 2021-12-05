import { Router } from 'express'
import controller from '../controllers/documents.controller'
const fs = require('fs')
const upload = require('./../middlewares/upload')
const router = Router()

router
    .route('/')
    .get((req, res, next) => {
        controller
            .getDocuments()
            .then((documents) => res.status(200).send(documents))
            .finally(next)
    })
    .post(upload, (req, res, next) => {
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
    .get(async (req, res, next) => {
        const { nameServer, name } = await controller.getDocument(parseInt(req.params.id))

        res.download(`./uploads/${nameServer}`, name, (err) => {
            if (err) {
                res.status(500).send({
                    message: 'Could not download the file. ' + err,
                })
            }
        })
    })
    .delete(async (req, res, next) => {
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
