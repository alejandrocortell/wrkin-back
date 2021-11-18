import { Router } from 'express'

import usersRoutes from './users.routes'
import documentsTypesRoutes from './documentsTypes.routes'
import statusRequesRoutes from './statusRequests.routes'
import rolesRoutes from './roles.routes'

const router = Router()
router.use('/users', usersRoutes)
router.use('/documents-types', documentsTypesRoutes)
router.use('/status-requests', statusRequesRoutes)
router.use('/roles', rolesRoutes)

export default router
