import { Router } from 'express'
import controller from '../controllers/documentsTypes.controller'
const val = require('../utils/validators')
const auth = require('../middlewares/authorization')
const role = require('../middlewares/rolePermission')
const router = Router()

router
    .route('/')
    .get(auth, (req, res, next) => {
        controller
            .getDocumentsTypes()
            .then((documentsTypes) => res.status(200).send(documentsTypes))
            .finally(next)
    })
    .post(auth, role(['admin']), (req, res, next) => {
        const name = req.body.name

        !val.isString(name) && res.status(400).send({ message: 'Invalid name' })

        controller
            .createDocumentType(name)
            .then((documentType) =>
                res
                    .location(req.baseUrl + '/' + String(documentType.id))
                    .status(201)
                    .send({ message: 'Created', documentType: documentType })
            )
            .finally(next)
    })

router
    .route('/:id(\\d+)')
    .get(auth, (req, res, next) => {
        controller
            .getDocumentType(parseInt(req.params.id))
            .then((documentType) => {
                documentType === 404 && res.status(404).send({ message: 'Not found' })
                res.status(200).send({ message: 'Found', documentType: documentType })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put(auth, role(['admin']), (req, res, next) => {
        const name = req.body.name

        name !== undefined && !val.isString(name) && res.status(400).send({ message: 'Invalid name' })

        controller
            .updateDocumentType(parseInt(req.params.id), name)
            .then((documentType) => {
                documentType === 404 && res.status(404).send({ message: 'Not found' })
                res.status(200).send({ message: 'Updated', documentType: documentType })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete(auth, role(['admin']), (req, res, next) => {
        controller
            .deleteDocumentType(parseInt(req.params.id))
            .then((documentType) => {
                documentType === 404 && res.status(404).send({ message: 'Not found' })
                res.status(200).send({ message: 'Deleted' })
            })
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
