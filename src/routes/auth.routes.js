import Router from 'express'
import authCtrl from '../controllers/auth.controller'
import { verifyJwt } from '../middlewares'

let router
router = Router(router)

// LOGIN
router.post('/login', authCtrl.logIn)

// CHANGE PASSWORD
router.post('/change-password', [verifyJwt], authCtrl.changePassword)

export default router
