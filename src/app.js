import express from 'express'
import morgan from 'morgan'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path'
import compression from 'compression'
import helmet from 'helmet'
import indexRoutes from './routes'
import { createAdmin } from '../initialSetup'
import fileUpload from 'express-fileupload'

// Initializations
const app = express()
createAdmin()
dotenv.config()

// Settings
app.set('port', process.env.PORT || 3001)

// Middlewares
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(helmet())
app.use(compression())
app.use(fileUpload())

// Routes
app.use('/api', indexRoutes)

// // this folders for this application will be used to store public file images
// app.use('/uploads', express.static(path.resolve('uploads')))

// // Upload Endpoint
// app.post('/uploads', (req, res) => {
//   if (req.files === null) {
//     return res.status(400).json({ msg: 'No file uploaded' });
//   }

//   const file = req.files.file;

//   file.mv(`uploads/${file.name}`, err => {
//     if (err) {
//       console.error(err);
//       return res.status(500).send(err);
//     }

//     res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
//   });
// });

// Not found route
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

export default app
