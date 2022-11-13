import { v4 as uuid } from 'uuid'
import { encryptPassword } from './src/controllers/user.controller'
import UserSchema from './src/models/User'
import BeneficiarySchema from './src/models/Beneficiary'

export const createAdmin = async () => {
  // check for an existing admin user--------------------------
  const user = await UserSchema.findOne({ email: 'jesielvirtualsa@gmail.com' })

  try {
    if (!user) {
      // create a new admin user
      await UserSchema.create({
        role: 'admin',
        // citizenshipNumberId: uuid(),
        citizenshipNumberId: 1234567890,
        name: 'super',
        surname: 'admin',
        email: process.env.EMAIL,
        password: encryptPassword(process.env.PASSWORD),
        phone: 1234567890,
        address: 'aaa',
        userCreate: '1000000',
        userUpdate: '1000000',
        userDelete: '1000000',
        deletedAt: 'aaa',
      })
      console.log('admin user created!')
    }
  } catch (error) {
    console.log(error)
  }

  // check for an existing beneficiary--------------------------
  let beneficiary = await BeneficiarySchema.findOne({
    citizenshipNumberId: '577881',
  })

  try {
    if (!beneficiary) {
      // create a new beneficiary
      await BeneficiarySchema.create({
        firstName: 'Luis',
        secondName: 'Enrique',
        firstSurname: 'Álverez',
        secondSurname: 'Plaza',
        gender: 'Masculino',
        typeCitizenshipNumberId: 'Cédula de ciudadanía',
        citizenshipNumberId: '577881',
        email: 'lealvarezp@unac.edu.co',
        cellPhoneNumber: '3145763198',
        address: 'wqwqwdqwdqwdqwd',
        birthDate: '2001-01-06',
        birthCountry: 'Venezuela',
        birthDepartment: 'Distrito Metropolitano de Caracas',
        birthCity: 'Caracas',
        academicProgram: 'Ingeniería de Sistemas',
        studentCode: '20181062490',
        semester: '10',
        beneficiaryPhoto: 'null',
        userCreate: '63682e12549e54f028425de9',
        userUpdate: '63682e12549e54f028425de9',
      })

      console.log('Luis Enrique Álvarez Plaza created!')
    }
  } catch (error) {
    console.log(error)
  }

  // check for an existing beneficiary--------------------------
  beneficiary = await BeneficiarySchema.findOne({
    citizenshipNumberId: '1192808259',
  })

  try {
    if (!beneficiary) {
      // create a new beneficiary
      await BeneficiarySchema.create({
        firstName: 'Jose',
        secondName: 'null',
        firstSurname: 'Baldovino',
        secondSurname: 'Rojas',
        gender: 'Masculino',
        typeCitizenshipNumberId: 'Cédula de ciudadanía',
        citizenshipNumberId: '1192808259',
        email: 'jdbaldovinor@unac.edu.co',
        cellPhoneNumber: '3227181076',
        address: 'wqwqwdqwdqwdqwd',
        birthDate: '1999-09-13',
        birthCountry: 'Colombia',
        birthDepartment: 'Sucre',
        birthCity: 'Guaranda',
        academicProgram: 'Ingeniería de Sistemas',
        studentCode: '20171067490',
        semester: '10',
        beneficiaryPhoto: 'null',
        userCreate: '63682e12549e54f028425de9',
        userUpdate: '63682e12549e54f028425de9',
      })

      console.log('José Baldovino Rojas created!')
    }
  } catch (error) {
    console.log(error)
  }

  // check for an existing beneficiary--------------------------
  beneficiary = await BeneficiarySchema.findOne({
    citizenshipNumberId: '1193468544',
  })

  try {
    if (!beneficiary) {
      // create a new beneficiary
      await BeneficiarySchema.create({
        firstName: 'Pedro',
        secondName: 'Alejandro',
        firstSurname: 'Castañeda',
        secondSurname: 'Cifuentes',
        gender: 'Masculino',
        typeCitizenshipNumberId: 'Cédula de ciudadanía',
        citizenshipNumberId: '1193468544',
        email: 'pacastanedac@unac.edu.co',
        cellPhoneNumber: '3145763198',
        address: 'wqwqwdqwdqwdqwd',
        birthDate: '2001-01-06',
        birthCountry: 'Colombia',
        birthDepartment: 'Guaviare',
        birthCity: 'El retorno',
        academicProgram: 'Ingeniería de Sistemas',
        studentCode: '20181030290',
        semester: '10',
        beneficiaryPhoto: 'null',
        userCreate: '63682e12549e54f028425de9',
        userUpdate: '63682e12549e54f028425de9',
      })

      console.log('Pedro Alejandro Castañena Cifuentes created!')
    }
  } catch (error) {
    console.log(error)
  }

  // check for an existing beneficiary--------------------------
  beneficiary = await BeneficiarySchema.findOne({
    citizenshipNumberId: '1193468545',
  })

  try {
    if (!beneficiary) {
      // create a new beneficiary
      await BeneficiarySchema.create({
        firstName: 'Efraín',
        secondName: 'null',
        firstSurname: 'Chaverra',
        secondSurname: 'Quinto',
        gender: 'Masculino',
        typeCitizenshipNumberId: 'Cédula de ciudadanía',
        citizenshipNumberId: '1193468545',
        email: 'echaverra@unac.edu.co',
        cellPhoneNumber: '3015214618',
        address: 'wqwqwdqwdqwdqwd',
        birthDate: '2001-01-06',
        birthCountry: 'Colombia',
        birthDepartment: 'Valle del Cauca',
        birthCity: 'Buenaventura',
        academicProgram: 'Ingeniería de Sistemas',
        studentCode: '20141012245',
        semester: '10',
        beneficiaryPhoto: 'null',
        userCreate: '63682e12549e54f028425de9',
        userUpdate: '63682e12549e54f028425de9',
      })

      console.log('Efraín Chaverra Quinto created!')
    }
  } catch (error) {
    console.log(error)
  }

  // check for an existing beneficiary--------------------------
  beneficiary = await BeneficiarySchema.findOne({
    citizenshipNumberId: '1037671705',
  })

  try {
    if (!beneficiary) {
      // create a new beneficiary
      await BeneficiarySchema.create({
        firstName: 'Marian',
        secondName: 'Elena',
        firstSurname: 'Córdoba',
        secondSurname: 'Batista',
        gender: 'Femenino',
        typeCitizenshipNumberId: 'Cédula de ciudadanía',
        citizenshipNumberId: '1037671705',
        email: 'marian.cordoba@unac.edu.co',
        cellPhoneNumber: '3143399194',
        address: 'wqwqwdqwdqwdqwd',
        birthDate: '1998-10-22',
        birthCountry: 'Colombia',
        birthDepartment: 'Chocó',
        birthCity: 'Unguía',
        academicProgram: 'Ingeniería de Sistemas',
        studentCode: '20181018290',
        semester: '10',
        beneficiaryPhoto: 'null',
        userCreate: '63682e12549e54f028425de9',
        userUpdate: '63682e12549e54f028425de9',
      })

      console.log('Marian Elena Córdoba Batista created!')
    }
  } catch (error) {
    console.log(error)
  }

  // check for an existing beneficiary--------------------------
  beneficiary = await BeneficiarySchema.findOne({
    citizenshipNumberId: '1192791447',
  })

  try {
    if (!beneficiary) {
      // create a new beneficiary
      await BeneficiarySchema.create({
        firstName: 'Yeith',
        secondName: 'Alberto',
        firstSurname: 'Echeverria',
        secondSurname: 'Yepez',
        gender: 'Masculino',
        typeCitizenshipNumberId: 'Cédula de ciudadanía',
        citizenshipNumberId: '1192791447',
        email: 'yaecheverriay@unac.edu.co',
        cellPhoneNumber: '3126546363',
        address: 'wqwqwdqwdqwdqwd',
        birthDate: '2001-01-06',
        birthCountry: 'Colombia',
        birthDepartment: 'Sucre',
        birthCity: 'Guaranda',
        academicProgram: 'Ingeniería de Sistemas',
        studentCode: '20181032022',
        semester: '9',
        beneficiaryPhoto: 'null',
        userCreate: '63682e12549e54f028425de9',
        userUpdate: '63682e12549e54f028425de9',
      })

      console.log('Yeith Alberto Echeverria Yepez created!')
    }
  } catch (error) {
    console.log(error)
  }

  // check for an existing beneficiary--------------------------
  beneficiary = await BeneficiarySchema.findOne({
    citizenshipNumberId: '1023969530',
  })

  try {
    if (!beneficiary) {
      // create a new beneficiary
      await BeneficiarySchema.create({
        firstName: 'Cristian',
        secondName: 'Alexis Esteban',
        firstSurname: 'Ladino',
        secondSurname: 'Dueñas',
        gender: 'Masculino',
        typeCitizenshipNumberId: 'Cédula de ciudadanía',
        citizenshipNumberId: '1023969530',
        email: 'caeladinod@unac.edu.co',
        cellPhoneNumber: '3126546363',
        address: 'wqwqwdqwdqwdqwd',
        birthDate: '2001-01-06',
        birthCountry: 'Colombia',
        birthDepartment: 'Cundinamarca',
        birthCity: 'Bogotá',
        academicProgram: 'Ingeniería de Sistemas',
        studentCode: '20172026190',
        semester: '10',
        beneficiaryPhoto: 'null',
        userCreate: '63682e12549e54f028425de9',
        userUpdate: '63682e12549e54f028425de9',
      })

      console.log('Cristian Alexis Esteban Ladino Dueñas created!')
    }
  } catch (error) {
    console.log(error)
  }

  // check for an existing beneficiary--------------------------
  beneficiary = await BeneficiarySchema.findOne({
    citizenshipNumberId: '1079096545',
  })

  try {
    if (!beneficiary) {
      // create a new beneficiary
      await BeneficiarySchema.create({
        firstName: 'Jackson',
        secondName: 'Isaac',
        firstSurname: 'Palacios',
        secondSurname: 'Córdoba',
        gender: 'Masculino',
        typeCitizenshipNumberId: 'Cédula de ciudadanía',
        citizenshipNumberId: '1079096545',
        email: 'jipalaciosc@unac.edu.co',
        cellPhoneNumber: '3145406467',
        address: 'wqwqwdqwdqwdqwd',
        birthDate: '2001-01-06',
        birthCountry: 'Colombia',
        birthDepartment: 'Chocó',
        birthCity: 'Itsmina',
        academicProgram: 'Ingeniería de Sistemas',
        studentCode: '20172020690',
        semester: '10',
        beneficiaryPhoto: 'null',
        userCreate: '63682e12549e54f028425de9',
        userUpdate: '63682e12549e54f028425de9',
      })

      console.log('Jackson Isaac Palacios Córdoba created!')
    }
  } catch (error) {
    console.log(error)
  }

  // check for an existing beneficiary--------------------------
  beneficiary = await BeneficiarySchema.findOne({
    citizenshipNumberId: '1193420246',
  })

  try {
    if (!beneficiary) {
      // create a new beneficiary
      await BeneficiarySchema.create({
        firstName: 'Jesiel',
        secondName: 'Obed',
        firstSurname: 'Palacios',
        secondSurname: 'Salinas',
        gender: 'Masculino',
        typeCitizenshipNumberId: 'Cédula de ciudadanía',
        citizenshipNumberId: '1193420246',
        email: 'jopalacioss@unac.edu.co',
        cellPhoneNumber: '3218739349',
        address: 'wqwqwdqwdqwdqwd',
        birthDate: '2001-05-06',
        birthCountry: 'Colombia',
        birthDepartment: 'Chocó',
        birthCity: 'Quibdó',
        academicProgram: 'Ingeniería de Sistemas',
        studentCode: '20181067390',
        semester: '10',
        beneficiaryPhoto: 'null',
        userCreate: '63682e12549e54f028425de9',
        userUpdate: '63682e12549e54f028425de9',
      })

      console.log('Jesiel Obed Palacios Salinas created!')
    }
  } catch (error) {
    console.log(error)
  }

  // check for an existing beneficiary--------------------------
  beneficiary = await BeneficiarySchema.findOne({
    citizenshipNumberId: '1007625021',
  })

  try {
    if (!beneficiary) {
      // create a new beneficiary
      await BeneficiarySchema.create({
        firstName: 'Kevin',
        secondName: 'Andrés',
        firstSurname: 'Pérez',
        secondSurname: 'Merchan',
        gender: 'Masculino',
        typeCitizenshipNumberId: 'Cédula de ciudadanía',
        citizenshipNumberId: '1007625021',
        email: 'kevin.perez@unac.edu.co',
        cellPhoneNumber: '3177148512',
        address: 'wqwqwdqwdqwdqwd',
        birthDate: '2001-02-06',
        birthCountry: 'Colombia',
        birthDepartment: 'San Andrés y Providencia',
        birthCity: 'San Andrés y Providencia',
        academicProgram: 'Ingeniería de Sistemas',
        studentCode: '20181079190',
        semester: '10',
        beneficiaryPhoto: 'null',
        userCreate: '63682e12549e54f028425de9',
        userUpdate: '63682e12549e54f028425de9',
      })

      console.log('Kevin Andrés Pérez Merchan created!')
    }
  } catch (error) {
    console.log(error)
  }

  // check for an existing beneficiary--------------------------
  beneficiary = await BeneficiarySchema.findOne({
    citizenshipNumberId: '1072925856',
  })

  try {
    if (!beneficiary) {
      // create a new beneficiary
      await BeneficiarySchema.create({
        firstName: 'Neider',
        secondName: 'Steven',
        firstSurname: 'Rodríguez',
        secondSurname: 'Camelo',
        gender: 'Masculino',
        typeCitizenshipNumberId: 'Cédula de ciudadanía',
        citizenshipNumberId: '1072925856',
        email: 'neider.rodriguez@unac.edu',
        cellPhoneNumber: '3005588181',
        address: 'wqwqwdqwdqwdqwd',
        birthDate: '2001-02-06',
        birthCountry: 'Colombia',
        birthDepartment: 'Cundinamarca',
        birthCity: 'Bogotá',
        academicProgram: 'Ingeniería de Sistemas',
        studentCode: '20181086390',
        semester: '10',
        beneficiaryPhoto: 'null',
        userCreate: '63682e12549e54f028425de9',
        userUpdate: '63682e12549e54f028425de9',
      })

      console.log('Neider Steven Rodríguez Camelo created!')
    }
  } catch (error) {
    console.log(error)
  }

  // check for an existing beneficiary--------------------------
  beneficiary = await BeneficiarySchema.findOne({
    citizenshipNumberId: '1193420246',
  })

  try {
    if (!beneficiary) {
      // create a new beneficiary
      await BeneficiarySchema.create({
        firstName: 'Isidro',
        secondName: 'Anthony',
        firstSurname: 'Romero',
        secondSurname: 'Díaz',
        gender: 'Masculino',
        typeCitizenshipNumberId: 'Cédula de ciudadanía',
        citizenshipNumberId: '1003378882',
        email: 'iaromerod@unac.edu.co',
        cellPhoneNumber: '3177148512',
        address: 'wqwqwdqwdqwdqwd',
        birthDate: '2001-02-06',
        birthCountry: 'Colombia',
        birthDepartment: 'Cesar',
        birthCity: 'Valledupar',
        academicProgram: 'Ingeniería de Sistemas',
        studentCode: '20181012122',
        semester: '10',
        beneficiaryPhoto: 'null',
        userCreate: '63682e12549e54f028425de9',
        userUpdate: '63682e12549e54f028425de9',
      })

      console.log('Isidro Anthony Romero Díaz created!')
    }
  } catch (error) {
    console.log(error)
  }

  // check for an existing beneficiary--------------------------
  beneficiary = await BeneficiarySchema.findOne({
    citizenshipNumberId: '1090457436',
  })

  try {
    if (!beneficiary) {
      // create a new beneficiary
      await BeneficiarySchema.create({
        firstName: 'Francisco',
        secondName: 'Javier',
        firstSurname: 'Sandoval',
        secondSurname: 'Aparicio',
        gender: 'Masculino',
        typeCitizenshipNumberId: 'Cédula de ciudadanía',
        citizenshipNumberId: '1090457436',
        email: 'fjsandovala@unac.edu.co',
        cellPhoneNumber: '3177148512',
        address: 'wqwqwdqwdqwdqwd',
        birthDate: '2001-02-06',
        birthCountry: 'Colombia',
        birthDepartment: 'Cesar',
        birthCity: 'Valledupar',
        academicProgram: 'Ingeniería de Sistemas',
        studentCode: '20171010390',
        semester: '10',
        beneficiaryPhoto: 'null',
        userCreate: '63682e12549e54f028425de9',
        userUpdate: '63682e12549e54f028425de9',
      })

      console.log('Francisco Javier Sandoval Aparicio created!')
    }
  } catch (error) {
    console.log(error)
  }
}
