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
  .post([verifyJwt, authJwt(['admin'])], interviewCtrl.createNewBeneficiary)

router
  .route('/beneficiary/:id')

  // GET ONE INTERVIEW BY ID
  .get([verifyJwt, authJwt(['admin'])], interviewCtrl.getOneBeneficiaryById)

  // UPDATE ONE INTERVIEW BY ID
  .put([verifyJwt, authJwt(['admin'])], interviewCtrl.updateOneBeneficiaryById)

  // DELETE ONE INTERVIEW BY ID
  .delete(
    [verifyJwt, authJwt(['admin'])],
    interviewCtrl.deleteOneBeneficiaryById
  )

export default router
