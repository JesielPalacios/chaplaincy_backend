import PhotoSchema from '../models/Photo'
import fs from 'fs-extra'
import path from 'path'

async function photos(req, res) {
  const photos = await PhotoSchema.find()
  res.status(200).json(photos)
}

async function createPhoto(req, res) {
  req.body.imagePath = req.file.path
  const photo = new PhotoSchema(req.body)
  await photo.save()
  return res.json({
    message: 'Photo Saved Successfully',
    photo
  })
}

async function photo(req, res) {
  const photo = await PhotoSchema.findById({ id: req.params.id })
  return res.json(photo)
}

async function updatePhoto(req, res) {
  const { id } = req.params
  const updatedPhoto = await PhotoSchema.findByIdAndUpdate(id, {
    title,
    description
  })
  return res.json({
    message: 'Successfully updated',
    updatedPhoto
  })
}

async function deletePhoto(req, res) {
  const photo = await PhotoSchema.findByIdAndRemove({ id: req.params.id })
  if (photo) {
    await fs.unlink(path.resolve(photo.imagePath))
  }
  return res.json({ message: 'Photo Deleted' })
}

export default {
  photos,
  createPhoto,
  photo,
  updatePhoto,
  deletePhoto
}
