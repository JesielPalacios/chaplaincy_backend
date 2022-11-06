import jwt from 'jsonwebtoken'
import UserSchema from '../models/User'

// let userId

export const verifyToken = async (req, res, next) => {
  let token = req.headers['authorization']
  // let jwtPayloadDecoded

  if (!token) res.status(403).json({ message: 'No token provided' })

  jwt.verify(token, process.env.JWT_SEC, async (err, user) => {
    req.user = user

    if (err) {
      res.status(403).json({ message: 'Token is not valid!' })
    } else {
      try {
        await UserSchema.findById(user.id, { password: 0 })
      } catch (error) {
        res.status(404).json({ message: 'No user found' })
      }

      // Call next
      next()
    }
  })

  // try {
  //   // const { currentId } = jwtPayloadDecoded
  //   // req.userId = currentId

  //   // res.locals.jwtPayload = jwtPayloadDecoded

  //   // const { _id, email } = jwtPayloadDecoded
  //   // // userId = _id

  //   // const newToken = jwt.sign({ id: _id, email: email }, process.env.JWT_SEC, {
  //   //   expiresIn: '8h'
  //   // })
  //   // res.setHeader('token', newToken)
  // } catch (e) {
  //   return res.status(401).json({ mensaje: 'You are not authenticated.' })
  // }
}

// export const currentUserId = () => userId
