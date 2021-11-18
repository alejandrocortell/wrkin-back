import { Router } from 'express'

import usersRoutes from './users.routes'
import documentsTypesRoutes from './documentsTypes.routes'
import statusRequesRoutes from './statusRequests.routes'

const router = Router()
router.use('/users', usersRoutes)
router.use('/documents-types', documentsTypesRoutes)
router.use('/status-requests', statusRequesRoutes)

export default router
