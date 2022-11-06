import { v4 as uuid } from 'uuid'
import { encryptPassword } from './src/controllers/user.controller'
import UserSchema from './src/models/User'

export const createAdmin = async () => {
  // check for an existing admin user

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
        deletedAt: 'aaa'
      })
      console.log('admin user created!')
    }
  } catch (error) {
    console.log(error)
  }
}
