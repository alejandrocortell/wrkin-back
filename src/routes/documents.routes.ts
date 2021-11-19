import { Router } from 'express'
import controller from '../controllers/documents.controller'

const router = Router()

router
    .route('/')
    .get((req, res, next) => {
        controller
            .getDocuments()
            .then((documents) => res.status(200).send(documents))
            .finally(next)
    })
    .post((req, res, next) => {
        controller
            .createDocument(
                req.body.name,
                req.body.nameServer,
                req.body.path,
                req.body.organization,
                req.body.user,
                req.body.documentType
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
            .getDocument(parseInt(req.params.id))
            .then((user) => res.status(200).send(user))
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .put((req, res, next) => {
        controller
            .updateDocument(
                parseInt(req.params.id),
                req.body.name ? req.body.name : undefined,
                req.body.nameServer ? req.body.nameServer : undefined,
                req.body.path ? req.body.path : undefined,
                req.body.organization ? req.body.organization : undefined,
                req.body.user ? req.body.user : undefined,
                req.body.documentType ? req.body.documentType : undefined
            )
            .then(() => res.status(201).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })
    .delete((req, res, next) => {
        controller
            .deleteDocument(parseInt(req.params.id))
            .then(() => res.status(200).send())
            .catch(() => res.status(404).send())
            .finally(next)
    })

export default router
