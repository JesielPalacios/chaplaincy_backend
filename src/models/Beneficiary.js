import mongoose from 'mongoose'

const BeneficiarySchema = new mongoose.Schema(
  {
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
    email: {
      type: String,
      max: 100,
      lowercase: true,
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
    academicProgram: {
      type: String,
      required: true,
      default: 'No aplica',
      enum: [
        'No aplica',
        'Licenciatura en Educación Infantil',
        'Licenciatura en Español e Inglés',
        'Licenciatura en Matemáticas',
        'Licenciatura en Música',
        'Administración de Empresas',
        'Contaduría Pública',
        'Tecnología en Mercadeo',
        'Enfermería Profesional',
        'Tecnología en Atención Prehospitalaria - Medellín',
        'Tecnología en Atención Prehospitalaria - Bucaramanga',
        'Ingeniería Industrial',
        'Ingeniería de Sistemas',
        'Licenciatura en Educaión Religiosa',
        'Teología',
      ],
    },
    studentCode: {
      type: String,
      required: true,
      unique: true,
      max: 11,
      min: 11,
      trim: true,
    },
    semester: {
      type: String,
      required: true,
      default: 'No aplica',
      enum: ['No aplica', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
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
    beneficiaryPhoto: {
      // ref: 'Photo',
      // type: mongoose.Schema.Types.ObjectId
      type: String,
      trim: true,
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

export default mongoose.model('Beneficiary', BeneficiarySchema)
