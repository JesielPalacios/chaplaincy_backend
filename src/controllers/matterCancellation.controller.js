import fs from 'fs-extra'
import { v4 as uuid } from 'uuid'
import MatterCancellationSchema from '../models/MatterCancellation'
import PhotoSchema from '../models/Photo'

async function matterCancellations(req, res) {
  try {
    const query = req.query.new
    const matterCancellations = query
      ? await MatterCancellationSchema.find({ requestingCustomer: req.user.id })
          .sort({ _id: -1 })
          .limit(5)
      : await MatterCancellationSchema.find()

    if (matterCancellations.length === 0) {
      res.status(204).json({ message: "There aren't any matter cancellations" })
    } else {
      res.status(200).json(matterCancellations)
    }
  } catch (err) {
    res.status(500).json(err)
  }
}

async function createMatterCancellation(req, res) {
  if (!(req.body.subjectToCancel && req.body.lastDateOfClassAttendance)) {
    return res.status(400).json({ message: 'Some data is needed' })
  }

  if (req.files === null) {
    return res.status(400).json({ message: 'No file uploaded' })
  }

  try {
    const file = req.files.file
    file.name = uuid() + file.name

    const newPhoto = new PhotoSchema({
      imagePath: '/uploads/' + file.name,
      userCreate: req.user.id,
      userUpdate: req.user.id,
    })

    const savedPhoto = await newPhoto.save()

    const newMatterCancellation = new MatterCancellationSchema({
      ...req.body,
      userCreate: req.user.id,
      userUpdate: req.user.id,
      requestingCustomer: req.user.id,
      studentSignature: savedPhoto._id,
    })

    file.mv(`uploads/${file.name}`, (err) => {
      if (err) {
        console.error(err)
        return res.status(500).send(err)
      }

      // res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
    })

    const savedMatterCancellation = await newMatterCancellation.save()
    res.status(201).json(savedMatterCancellation)
  } catch (err) {
    res.status(500).json(err)
    await fs.unlink(`./uploads/${file.name}`)
  }
}

async function matterCancellation(req, res) {
  try {
    const matterCancellation = await MatterCancellationSchema.findById(
      req.params.id
    )

    res.status(200).json(matterCancellation._doc)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function updateMatterCancellation(req, res) {
  try {
    const updatedUser = await MatterCancellationSchema.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    )
    res.status(200).json(updatedUser)
  } catch (err) {
    res.status(500).json(err)
  }
}

async function deleteMatterCancellation(req, res) {
  try {
    await MatterCancellationSchema.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Matter cancellation has been deleted...' })
  } catch (err) {
    console.log(err)
    res.status(500).json(err)
  }
}

export default {
  matterCancellations,
  createMatterCancellation,
  matterCancellation,
  updateMatterCancellation,
  deleteMatterCancellation,
}
