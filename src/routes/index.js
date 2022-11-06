import Router from 'express'

import authRoutes from './auth.routes'
import userRoutes from './user.routes'
import beneficiaryRoutes from './beneficiary.routes'

let router
router = Router(router)

router.use('/auth', authRoutes)
router.use('/', userRoutes)
router.use('/', beneficiaryRoutes)

export default router
