import Router from 'express'
import beneficiaryCtrl from '../controllers/beneficiary.controller'
import { verifyJwt, authJwt } from '../middlewares'

let router
router = Router(router)

router
  .route('/beneficiaries')

  // GET ALL BENEFICIARIES
  .get([verifyJwt, authJwt(['admin'])], beneficiaryCtrl.getAllBeneficiaries)

  // CREATE A NEW BENEFICIARY
  .post([verifyJwt, authJwt(['admin'])], beneficiaryCtrl.createNewBeneficiary)

router
  .route('/beneficiary/:id')

  // GET ONE BENEFICIARY BY ID
  .get([verifyJwt, authJwt(['admin'])], beneficiaryCtrl.getOneBeneficiaryById)

  // UPDATE ONE BENEFICIARY BY ID
  .put(
    [verifyJwt, authJwt(['admin'])],
    beneficiaryCtrl.updateOneBeneficiaryById
  )

  // DELETE ONE BENEFICIARY BY ID
  .delete(
    [verifyJwt, authJwt(['admin'])],
    beneficiaryCtrl.deleteOneBeneficiaryById
  )

export default router
