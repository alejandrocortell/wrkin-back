import { Router } from 'express'

import daysOffRoutes from './daysOffTypes.routes'
import documentsTypesRoutes from './documentsTypes.routes'
import rolesRoutes from './roles.routes'
import settingsRoutes from './settings.routes'
import statusRequesRoutes from './statusRequests.routes'
import usersRoutes from './users.routes'

const router = Router()
router.use('/days-off', daysOffRoutes)
router.use('/documents-types', documentsTypesRoutes)
router.use('/roles', rolesRoutes)
router.use('/settings', settingsRoutes)
router.use('/status-requests', statusRequesRoutes)
router.use('/users', usersRoutes)

export default router
