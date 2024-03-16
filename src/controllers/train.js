import upload from '../middlewares/upload.js'
import Train, { trainSchemaValidator } from '../models/train.js'

export const addTrain = async (req, res, next) => {
  try {
    const { value, error } = trainSchemaValidator.validate(req.body)

    if (error) {
      return res.status(400).json({ error: error.details[0].message })
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' })
    }

    const e = await Train.find({ trainId: value.trainId })
    if (e.length > 0) {
      return res.json({ error: 'train exists' })
    }
    value.imagePath = req.file.path
    const train = new Train(value)
    await train.save()
    res.status(201).json(train)
  } catch (err) {
    res.status(500).json({ error: 'An error occurred while adding the train' })
  }
}

export const getAllTrains = async (req, res) => {
  console.log('Retriving Trains')
  try {
    const trains = await Train.find({})

    const trainsWithImageUrls = trains.map((train) => ({
      ...train.toObject(),
      imagePath: `${req.protocol}://${req.get(
        'host'
      )}/uploads/${train.imagePath.substring(8)}`,
    }))

    res.json(trainsWithImageUrls)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the trains' })
  }
}
