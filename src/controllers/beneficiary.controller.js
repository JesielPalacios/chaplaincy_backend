import CryptoJS from 'crypto-js'
import fs from 'fs-extra'
import path from 'path'

import BeneficiarySchema from '../models/Beneficiary'
import ImageSchema from '../models/Photo'

export function encryptPassword(passwordToEncrypt) {
  return CryptoJS.AES.encrypt(
    passwordToEncrypt,
    process.env.PASS_SEC
  ).toString()
}

async function getAllBeneficiaries(req, res) {
  const query = req.query.new

  try {
    const beneficiarys = query
      ? await BeneficiarySchema.find().sort({ _id: -1 }).limit(5)
      : await BeneficiarySchema.find()

    if (beneficiarys.length === 0)
      // res.status(204).json({ message: "There aren't beneficiarys" })
      res.status(200).json([])
    else res.status(200).json(beneficiarys)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function createNewBeneficiary(req, res) {
  function checkDataValidation(reqBody) {
    if (
      !(
        reqBody.firstName ||
        reqBody.firstSurname ||
        reqBody.gender ||
        reqBody.typeCitizenshipNumberId ||
        reqBody.citizenshipNumberId ||
        reqBody.address ||
        reqBody.birthDate ||
        reqBody.birthCountry ||
        reqBody.birthDepartment ||
        reqBody.birthCity
      )
    ) {
      return true
    } else {
      return false
    }
  }

  if (checkDataValidation(req.body)) {
    return res.status(400).json({ message: 'Some info is missing' })
  }

  const storedBeneficiary = await BeneficiarySchema.findOne({
    citizenshipNumberId: req.body.citizenshipNumberId,
  })

  if (storedBeneficiary) {
    res.status(400).json({ message: 'Beneficiary already exist' })
  } else {
    try {
      req.body.userCreate = req.user.id
      req.body.userUpdate = req.user.id

      let newBeneficiary = req.files
        ? new BeneficiarySchema({
            ...req.body,
            beneficiaryPhoto:
              '/uploads/' + req.files.beneficiaryPhoto.name.split(' ').join(''),
          })
        : new BeneficiarySchema({ ...req.body })

      if (req.files) {
        if (req.files === null) {
          return res.status(400).json({ message: 'No file uploaded' })
        }

        const file = req.files.beneficiaryPhoto

        const newImage = new ImageSchema({
          imagePath: '/uploads/' + file.name.split(' ').join(''),
          userCreate: req.user.id,
          userUpdate: req.user.id,
          photoSubject: newBeneficiary._id.valueOf(),
        })
        await newImage.save()

        file.mv('./uploads/' + file.name.split(' ').join(''), (err) => {
          if (err) {
            console.error(err)
            return res.status(500).send(err)
          }
          // res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
        })
      }

      const savedBeneficiary = await newBeneficiary.save()
      res.status(201).json(savedBeneficiary)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

async function getOneBeneficiaryById(req, res) {
  try {
    const beneficiary = await BeneficiarySchema.findById(req.params.id)
    const { password, ...others } = beneficiary._doc
    res.status(200).json(others)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function updateOneBeneficiaryById(req, res) {
  if (req.body.password) req.body.password = encryptPassword(req.body.password)

  try {
    const updatedBeneficiary = await BeneficiarySchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )

    updatedBeneficiary.beneficiaryPhoto =
      '/uploads/' + req.files.plantPhoto.name.split(' ').join('')

    if (req.files) {
      if (req.files === null) {
        return res.status(400).json({ message: 'No file uploaded' })
      }

      let image = PhotoSchema.findOne({
        photoSubject: req.params.id,
      })

      // Delete old image file
      if (image) {
        await fs.unlink(path.resolve('.' + image.imagePath))
      }

      // Add new image data
      const file = req.files.plantPhoto

      image.imagePath = '/uploads/' + file.name.split(' ').join('')
      image.photoSubject = updatedBeneficiary._id.valueOf()
      image.userUpdate = req.params.id
      await image.save()

      // Add new image file
      file.mv('./uploads' + file.name.split(' ').join(''), (err) => {
        if (err) {
          console.error(err)
          return res.status(500).send(err)
        }
      })
    }

    // Update in DB
    const savedPlant = await updatedBeneficiary.save()
    res.status(204).json(savedPlant)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function deleteOneBeneficiaryById(req, res) {
  try {
    await BeneficiarySchema.findByIdAndDelete(req.params.id)

    let image = await PhotoSchema.findOneAndRemove({
      photoSubject: req.params.id,
    })

    if (image) {
      await fs.unlink(path.resolve('.' + image.imagePath))
    }

    res.status(200).json({ message: 'Beneficiary has been deleted...' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export default {
  getAllBeneficiaries,
  createNewBeneficiary,
  getOneBeneficiaryById,
  updateOneBeneficiaryById,
  deleteOneBeneficiaryById,
}
