import CryptoJS from 'crypto-js'
import fs from 'fs-extra'
import path from 'path'

import InterviewSchema from '../models/Interview'
import UserSchema from '../models/User'
import ImageSchema from '../models/Photo'

export function encryptPassword(passwordToEncrypt) {
  return CryptoJS.AES.encrypt(
    passwordToEncrypt,
    process.env.PASS_SEC
  ).toString()
}

async function getAllInterviews(req, res) {
  const query = req.query.new

  try {
    const interviews = query
      ? await InterviewSchema.find().sort({ _id: -1 }).limit(5)
      : await InterviewSchema.find()

    if (interviews.length === 0)
      // res.status(204).json({ message: "There aren't beneficiarys" })
      res.status(200).json([])
    else res.status(200).json(interviews)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function createNewInterview(req, res) {
  function checkDataValidation(reqBody) {
    if (
      !(
        reqBody.topic ||
        reqBody.topicDescription ||
        reqBody.actionsDescription ||
        reqBody.referralDepartment ||
        reqBody.status ||
        reqBody.beneficiary
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

  const storedUser = await UserSchema.findById(req.user.id)

  // const storedInterview = await InterviewSchema.findOne({
  //   topicDescription: req.body.topicDescription,
  // })

  if (!storedUser) {
    res.status(400).json({ message: 'Error' })
    // } else if (storedInterview) {
    // res.status(400).json({ message: 'Interview already exist' })
  } else if (!req.body.beneficiary) {
    res.status(400).json({ message: 'Beneficiary is needed' })
  } else {
    try {
      req.body.userCreate = storedUser.citizenshipNumberId
      req.body.userUpdate = storedUser.citizenshipNumberId

      let newInterview = new InterviewSchema({ ...req.body })

      const savedInterview = await newInterview.save()
      res.status(201).json(savedInterview)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}

async function getOneInterviewById(req, res) {
  try {
    const interview = await InterviewSchema.findById(req.params.id)
    res.status(200).json(interview)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function updateOneInterviewById(req, res) {
  try {
    let updatedInterview = await InterviewSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )

    res.status(201).json(updatedInterview)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function deleteOneBeneficiaryById(req, res) {
  try {
    await InterviewSchema.findByIdAndDelete(req.params.id)

    let image = await ImageSchema.findOneAndRemove({
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
  getAllInterviews,
  createNewInterview,
  getOneInterviewById,
  updateOneInterviewById,
  deleteOneBeneficiaryById,
}
