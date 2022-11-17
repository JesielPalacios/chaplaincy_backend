import Router from 'express'
import beneficiaryCtrl from '../controllers/beneficiary.controller'
import { verifyJwt, authJwt } from '../middlewares'
// import fileUpload from 'express-fileupload'

let router
router = Router(router)

router
  .route('/beneficiaries')

  // GET ALL BENEFICIARIES
  .get([verifyJwt, authJwt(['admin'])], beneficiaryCtrl.getAllBeneficiaries)

  // CREATE A NEW BENEFICIARY
  .post(
    [verifyJwt, authJwt(['admin'])],
    // fileUpload({
    //   useTempFiles: true,
    //   tempFileDir: './uploads',
    // }),
    beneficiaryCtrl.createNewBeneficiary
  )

router
  .route('/beneficiary/:id')

  // GET ONE BENEFICIARY BY ID
  .get([verifyJwt, authJwt(['admin'])], beneficiaryCtrl.getOneBeneficiaryById)

  // UPDATE ONE BENEFICIARY BY ID
  .put(
    [verifyJwt, authJwt(['admin'])],
    // fileUpload({
    //   useTempFiles: true,
    //   tempFileDir: './uploads',
    // }),
    beneficiaryCtrl.updateOneBeneficiaryById
  )

  // DELETE ONE BENEFICIARY BY ID
  .delete(
    [verifyJwt, authJwt(['admin'])],
    // fileUpload({
    //   useTempFiles: true,
    //   tempFileDir: './uploads',
    // }),
    beneficiaryCtrl.deleteOneBeneficiaryById
  )

router
  .route('/beneficiaryStats')

  // GET BENEFICIARIES STATS
  .get([verifyJwt, authJwt(['admin'])], beneficiaryCtrl.beneficiaryStats)

export default router
