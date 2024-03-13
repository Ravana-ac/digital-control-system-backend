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
