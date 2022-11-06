import UserSchema from '../models/User'

export const checkRols = (roles) => {
  return async (req, res, next) => {
    // const { _id } = res.locals.jwtPayload
    const { id } = req.user
    let user

    try {
      user = await UserSchema.findById({ _id: id })
      //Check
      const { role } = user
      if (roles.includes(role)) {
        next()
      } else {
        res.status(401).json({ mensaje: 'Not authorized' })
      }
    } catch (e) {
      return res.status(401).json({ mensaje: 'Not authorized!' })
    }
  }
}
