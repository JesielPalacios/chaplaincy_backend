import CryptoJS from 'crypto-js'
import fs from 'fs-extra'
import path from 'path'

import InterviewSchema from '../models/Interview'
import UserSchema from '../models/User'
import ImageSchema from '../models/Photo'

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

async function interviewStats(req, res) {
  const date = new Date()
  const currentYear = new Date(date.setFullYear(date.getFullYear()))
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))

  try {
    const createdPerDay = await InterviewSchema.aggregate()
      .project({ dia: { $dayOfWeek: '$createdAt' } })
      .group({
        _id: '$dia',
        count: { $sum: 1 },
      })
    // const createdPerWeek = await InterviewSchema.aggregate([
    //   { $match: { createdAt: { $gte: currentYear } } },
    //   {
    //     $project: {
    //       semanal: { $week: '$createdAt' },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: '$semanal',
    //       total: { $sum: 1 },
    //     },
    //   },
    // ])

    const createdPerWeek = await InterviewSchema.aggregate()
      .project({ semana: { $week: '$createdAt' } })
      .group({
        _id: '$semana',
        count: { $sum: 1 },
      })

    // const createdPerMonth = await InterviewSchema.aggregate([
    //   { $match: { createdAt: { $gte: currentYear } } },
    //   {
    //     $project: {
    //       mes: { $month: '$createdAt' },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: '$mes',
    //       total: { $sum: 1 },
    //     },
    //   },
    // ])

    const createdPerMonth = await InterviewSchema.aggregate()
      .project({ mes: { $month: '$createdAt' } })
      .group({
        _id: '$mes',
        count: { $sum: 1 },
      })

    // const createdPerYear = await InterviewSchema.aggregate([
    //   { $match: { createdAt: { $gte: currentYear } } },
    //   {
    //     $project: {
    //       anio: { $year: '$createdAt' },
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: '$anio',
    //       total: { $sum: 1 },
    //     },
    //   },
    // ])

    const createdPerYear = await InterviewSchema.aggregate()
      .project({ anio: { $year: '$createdAt' } })
      .group({
        _id: '$anio',
        count: { $sum: 1 },
      })

    const interviewsPerTopic = await InterviewSchema.aggregate().group({
      _id: '$topic',
      count: { $sum: 1 },
    })

    const interviewsPerActionsDescription =
      await InterviewSchema.aggregate().group({
        _id: '$actionsDescription',
        count: { $sum: 1 },
      })

    const interviewsPerReferralDepartment =
      await InterviewSchema.aggregate().group({
        _id: '$referralDepartment',
        count: { $sum: 1 },
      })

    const interviewsPerStatus = await InterviewSchema.aggregate().group({
      _id: '$status',
      count: { $sum: 1 },
    })

    const interviewsPerBeneficiary = await InterviewSchema.aggregate().group({
      _id: '$beneficiary',
      count: { $sum: 1 },
    })

    const interviewsPerChaplain = await InterviewSchema.aggregate().group({
      _id: '$userCreate',
      count: { $sum: 1 },
    })

    // console.log({
    //   interviewsPerTopic,
    //   interviewsPerActionsDescription,
    //   interviewsPerReferralDepartment,
    //   interviewsPerStatus,
    //   interviewsPerBeneficiary,
    //   interviewsPerChaplain,
    //   createdPerDay,
    //   createdPerWeek,
    //   createdPerMonth,
    //   createdPerYear,
    // })

    res.status(200).json({
      interviewsPerTopic,
      interviewsPerActionsDescription,
      interviewsPerReferralDepartment,
      interviewsPerStatus,
      interviewsPerBeneficiary,
      interviewsPerChaplain,
      createdPerDay,
      createdPerWeek,
      createdPerMonth,
      createdPerYear,
    })
  } catch (err) {
    res.status(500).json(err)
  }
}

export default {
  getAllInterviews,
  createNewInterview,
  getOneInterviewById,
  updateOneInterviewById,
  deleteOneBeneficiaryById,
  interviewStats,
}
