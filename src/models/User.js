import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    // roleId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Role',
    // },
    role: {
      type: String,
      default: 'customer',
      enum: ['admin', 'customer'],
      required: true,
      trim: true,
    },
    citizenshipNumberId: {
      type: String,
      required: true,
      unique: true,
    },
    typeCitizenshipNumberId: {
      type: String,
      required: true,
      default: 'Cédula de ciudadanía',
      enum: [
        'Cédula de ciudadanía',
        'Tarjeta de identidad',
        'Cédula de extranjería',
        'Visa',
        'Pasaporte',
        'Registro Civil',
      ],
    },
    name: {
      type: String,
      required: true,
      min: 3,
      max: 45,
      lowercase: true,
      trim: true,
    },
    // firstName: {
    //   type: String,
    //   required: true,
    //   min: 3,
    //   max: 45,
    //   lowercase: true,
    //   trim: true,
    // },
    // secondName: {
    //   type: String,
    //   min: 3,
    //   max: 45,
    //   lowercase: true,
    //   trim: true,
    // },
    surname: {
      type: String,
      required: true,
      min: 3,
      max: 45,
      lowercase: true,
      trim: true,
    },
    // fistSurname: {
    //   type: String,
    //   required: true,
    //   min: 3,
    //   max: 45,
    //   lowercase: true,
    //   trim: true,
    // },
    // secondSurname: {
    //   type: String,
    //   required: true,
    //   min: 3,
    //   max: 45,
    //   lowercase: true,
    //   trim: true,
    // },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    phoneNumber: {
      type: String,
      min: 10,
      trim: true,
    },
    address: {
      type: String,
      min: 6,
      max: 100,
      trim: true,
    },
    // photo: {
    //   ref: 'Photo',
    //   type: mongoose.Schema.Types.ObjectId,
    // },
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

export default mongoose.model('User', UserSchema)
