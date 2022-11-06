import Router from 'express'
import matterCancellationCtrl from '../controllers/matterCancellation.controller'
import { verifyJwt, authJwt } from '../middlewares'
import upload from '../middlewares/multer'

let router
router = Router(router)

router
  .route('/matter-cancellations')

  // GET ALL MATTER CANCELLATIONS
  .get(
    [verifyJwt, authJwt(['admin', 'customer'])],
    matterCancellationCtrl.matterCancellations
  )

  // CREATE A MATTER CANCELLATION
  .post(
    [verifyJwt, authJwt(['admin', 'customer'])],
    // upload.single('image'),
    matterCancellationCtrl.createMatterCancellation
  )

router
  .route('/matter-cancellation/:id')

  // GET A MATTER CANCELLATION BY ID
  .get(
    [verifyJwt, authJwt(['admin'])],
    matterCancellationCtrl.matterCancellation
  )

  // UPDATE A MATTER CANCELLATION BY ID
  .put(
    [verifyJwt, authJwt(['admin'])],
    matterCancellationCtrl.updateMatterCancellation
  )

  // DELETE A MATTER CANCELLATION BY ID
  .delete(
    [verifyJwt, authJwt(['admin'])],
    matterCancellationCtrl.deleteMatterCancellation
  )

export default router
