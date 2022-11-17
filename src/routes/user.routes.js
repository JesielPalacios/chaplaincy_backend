import Router from 'express'
import userCtrl from '../controllers/user.controller'
import { verifyJwt, authJwt } from '../middlewares'

let router
router = Router(router)

router
  .route('/users')

  // GET ALL USERS
  .get([verifyJwt, authJwt(['admin'])], userCtrl.getAllUsers)

  // CREATE A NEW USER
  .post([verifyJwt, authJwt(['admin'])], userCtrl.createNewUser)

router
  .route('/user/:id')

  // GET AN USER BY ID
  .get([verifyJwt, authJwt(['admin'])], userCtrl.getAnUserById)

  // UPDATE AN USER BY ID
  .put([verifyJwt, authJwt(['admin'])], userCtrl.updateAnUserById)

  // DELETE AN USER BY ID
  .delete([verifyJwt, authJwt(['admin'])], userCtrl.deleteAnUserById)

router
  .route('/interviewStats')
  // GET USERS STATS
  .get([verifyJwt, authJwt(['admin'])], userCtrl.userStats)

export default router
