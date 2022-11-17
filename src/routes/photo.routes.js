import Router from 'express'
import photoCtrl from '../controllers/photo.controller'
import { verifyJwt, authJwt } from '../middlewares'
// import upload from '../middlewares/multer'

let router
router = Router(router)

router
  .route('/photos')

  // GET ALL PHOTOS
  .get([verifyJwt, authJwt(['admin'])], photoCtrl.photos)

  // CREATE A NEW PHOTO
  // .post(
  //   [verifyJwt, authJwt(['admin, customer'])],
  //   upload.single('image'),
  //   photoCtrl.createPhoto
  // )

router
  .route('/photo/:id')

  // GET A PHOTO BY ID
  .get([verifyJwt, authJwt(['admin, customer'])], photoCtrl.photo)

  // UPDATE A PHOTO BY ID
  .put([verifyJwt, authJwt(['admin'])], photoCtrl.updatePhoto)

  // DELETE A PHOTO BY ID
  .delete([verifyJwt, authJwt(['admin'])], photoCtrl.deletePhoto)

export default router
