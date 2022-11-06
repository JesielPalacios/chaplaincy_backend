import mongoose from 'mongoose'

const ImageSchema = new mongoose.Schema(
  {
    imagePath: String,
    photoSubject: {
      type: String,
      required: true,
    },
    userCreate: {
      type: String,
      required: true,
    },
    userUpdate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default mongoose.model('Image', ImageSchema)
