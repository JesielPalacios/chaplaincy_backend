import Router from 'express'
import interviewCtrl from '../controllers/interview.controller'
import { verifyJwt, authJwt } from '../middlewares'

let router
router = Router(router)

router
  .route('/interviews')

  // GET ALL INTERVIEWS
  .get([verifyJwt, authJwt(['admin'])], interviewCtrl.getAllInterviews)

  // CREATE A NEW INTERVIEW
  .post([verifyJwt, authJwt(['admin'])], interviewCtrl.createNewInterview)

router
  .route('/interview/:id')

  // GET ONE INTERVIEW BY ID
  .get([verifyJwt, authJwt(['admin'])], interviewCtrl.getOneInterviewById)

  // UPDATE ONE INTERVIEW BY ID
  .put([verifyJwt, authJwt(['admin'])], interviewCtrl.updateOneInterviewById)

  // DELETE ONE INTERVIEW BY ID
  .delete(
    [verifyJwt, authJwt(['admin'])],
    interviewCtrl.deleteOneBeneficiaryById
  )

router
  .route('/statsInterviews')

  // GET INTERVIEWS STATS
  .get([verifyJwt, authJwt(['admin'])], interviewCtrl.interviewStats)

export default router
