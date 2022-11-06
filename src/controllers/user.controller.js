import UserSchema from '../models/User';
import CryptoJS from 'crypto-js'

export function encryptPassword(passwordToEncrypt) {
  return CryptoJS.AES.encrypt(passwordToEncrypt, process.env.PASS_SEC).toString()
}

/**
 * Controlador para obtener todos los usuarios de la base de datos.
 *
 * @constructor
 * @param {Request} req - Objeto de petición.
 * @param {Response} res - Objeto de respuesta de la petición.
 */

async function getAllUsers(req, res) {
  const query = req.query.new

  try {
    const users = query
      ? await UserSchema.find().sort({ _id: -1 }).limit(5)
      : await UserSchema.find()

    if (users.length === 0) res.status(204).json({ message: 'There aren\'t users' })

    res.status(200).json(users)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function createNewUser(req, res) {
  if (!(req.body.email && req.body.password)) {
    return res.status(400).json({ message: 'Some credentials are missing' })
  }

  req.body.userCreate = req.user.id
  req.body.userUpdate = req.user.id
  req.body.password = encryptPassword(req.body.password)

  const newUser = new UserSchema({ ...req.body })

  try {
    const savedUser = await newUser.save()
    res.status(201).json(savedUser)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function getAnUserById(req, res) {
  try {
    const user = await UserSchema.findById(req.params.id)
    const { password, ...others } = user._doc
    res.status(200).json(others)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function updateAnUserById(req, res) {
  if (req.body.password) req.body.password = encryptPassword(req.body.password)

  try {
    const updatedUser = await UserSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body
      },
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function deleteAnUserById(req, res) {
  try {
    await UserSchema.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'User has been deleted...' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export default { getAllUsers, createNewUser, getAnUserById, updateAnUserById, deleteAnUserById }
