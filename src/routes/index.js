import Router from 'express'

import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import beneficiaryRoutes from './beneficiary.routes'
import photoRoutes from './photo.routes'
import interviewRoutes from './interview.routes'

let router
router = Router(router)

router.use('/auth', authRoutes)
router.use('/', userRoutes)
router.use('/', beneficiaryRoutes)
router.use('/', photoRoutes)
router.use('/', interviewRoutes)

export default router
