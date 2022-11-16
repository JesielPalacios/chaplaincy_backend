import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema(
  {
    // roleId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'Role',
    // },
    role: {
      type: String,
      default: 'guest',
      enum: ['admin', 'guest'],
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      max: 100,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 45,
      lowercase: true,
      trim: true,
    },
    secondName: {
      type: String,
      min: 3,
      max: 45,
      lowercase: true,
      trim: true,
    },
    firstSurname: {
      type: String,
      required: true,
      min: 3,
      max: 45,
      lowercase: true,
      trim: true,
    },
    secondSurname: {
      type: String,
      min: 3,
      max: 45,
      lowercase: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      default: 'Masculino',
      enum: ['Masculino', 'Femenino', 'No binario'],
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
    citizenshipNumberId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    cellPhoneNumber: {
      type: String,
      max: 20,
      trim: true,
    },
    address: {
      type: String,
      min: 6,
      max: 100,
      trim: true,
    },
    birthDate: {
      type: Date,
      required: true,
      trim: true,
    },
    // countryOfBirth: {
    //   type: String,
    //   required: true,
    //   default: 'Colombia',
    //   enum: [
    //     'Colombia',
    //     'Argentina',
    //     'Ecuador',
    //     'Chile',
    //     'Peru',
    //     'Uruguar',
    //     'Paraguay',
    //     'Bolivia',
    //     'Mexico',
    //     'Venezuela',
    //     'Guatemala',
    //     'Costa Rica',
    //     'República Dominicana',
    //     'El Salvador',
    //     'Guyana',
    //     'Panamá',
    //     'Estados Unidos',
    //     'España',
    //     'Noruega'
    //   ],
    // },
    birthCountry: {
      type: String,
      required: true,
      max: 65,
      trim: true,
    },
    birthDepartment: {
      type: String,
      required: true,
      max: 65,
      trim: true,
    },
    birthCity: {
      type: String,
      required: true,
      max: 65,
      trim: true,
    },
    userPhoto: {
      // ref: 'Photo',
      // type: mongoose.Schema.Types.ObjectId
      type: String,
      trim: true,
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

export default mongoose.model('User', UserSchema)
