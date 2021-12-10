const { Router } = require('express')

import authRoutes from './auth.routes'
import bulkDataRoutes from './bulkData.routes'
import daysOffRoutes from './daysOffTypes.routes'
import documentsRoutes from './documents.routes'
import documentsTypesRoutes from './documentsTypes.routes'
import organizationsRoutes from './organizations.routes'
import punchsInsRoutes from './punchsIn.routes'
import requestsDaysOffRoutes from './requestsDaysOff.routes'
import rolesRoutes from './roles.routes'
import settingsRoutes from './settings.routes'
import statusRequesRoutes from './statusRequests.routes'
import usersRoutes from './users.routes'

const router = Router()

router.use('/auth', authRoutes)
router.use('/bulk-data', bulkDataRoutes)
router.use('/days-off', daysOffRoutes)
router.use('/documents', documentsRoutes)
router.use('/documents-types', documentsTypesRoutes)
router.use('/organizations', organizationsRoutes)
router.use('/punchs-in', punchsInsRoutes)
router.use('/requests-days-off', requestsDaysOffRoutes)
router.use('/roles', rolesRoutes)
router.use('/settings', settingsRoutes)
router.use('/status-requests', statusRequesRoutes)
router.use('/users', usersRoutes)

export default router
