import mongoose from 'mongoose'

const Role = new mongoose.Schema(
  {
    roleId: {
      type: Number,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
)

export default mongoose.model('Role', Role)
