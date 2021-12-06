import { Router } from 'express'
import controller from '../controllers/documentsTypes.controller'
const auth = require('../middlewares/authorization')

const router = Router()

router
    .route('/')
    .get(auth, (req, res, next) => {
        controller
            .getDocumentsTypes()
            .then((documentsTypes) => res.status(200).send(documentsTypes))
            .finally(next)
    })
    .post(auth, (req, res, next) => {
        controller
            .createDocumentType(req.body.name)
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
    .get(auth, (req, res, next) => {
        controller
            .getDocumentType(parseInt(req.params.id))
            .then((documentType) => res.status(200).send(documentType))
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put(auth, (req, res, next) => {
        controller
            .updateDocumentType(parseInt(req.params.id), req.body.name)
            .then(() => res.status(201).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete(auth, (req, res, next) => {
        controller
            .deleteDocumentType(parseInt(req.params.id))
            .then(() => res.status(200).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
