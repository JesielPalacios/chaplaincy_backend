import mongoose from 'mongoose'

const MatterCancellationSchema = new mongoose.Schema(
  {
    subjectToCancel: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    teacher: {
      type: String,
      required: true,
      // type: mongoose.Schema.Types.ObjectId,
      // ref: 'Teacher',
    },
    currentFinalNote: {
      type: String,
      lowercase: true,
      trim: true,
      min: 1,
      max: 3,
    },
    totalAttendanceFailures: {
      type: String,
      lowercase: true,
      trim: true,
      min: 1,
      max: 3,
    },
    lastDateOfClassAttendance: {
      type: Date,
      required: true,
    },
    coordinatorSignature: {
      ref: 'File',
      type: mongoose.Schema.Types.ObjectId,
    },
    teacherSignature: {
      ref: 'File',
      type: mongoose.Schema.Types.ObjectId,
    },
    studentSignature: {
      ref: 'File',
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    studentWasWithdrawnFromSION: {
      type: Boolean,
      default: false,
    },
    theStudentOwesSomeDocument: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: 'Sin revisión',
      enum: ['Sin revisión', 'En revisión', 'Aprobado'],
    },
    observation: {
      type: String,
      lowercase: true,
      trim: true,
      max: 1500,
    },
    requestingCustomer: {
      // ref: 'Customer',
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      required: true,
    },
    userCreate: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
    },
    userUpdate: {
      ref: 'User',
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

export default mongoose.model('MatterCancellation', MatterCancellationSchema)
