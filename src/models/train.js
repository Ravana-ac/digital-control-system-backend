import { Schema, model } from 'mongoose'
import Joi from 'joi'

const trainSchema = new Schema(
  {
    trainId: { type: String, required: true },
    trainName: { type: String, required: true },
    imagePath: { type: String },
  },
  { timestamps: true }
)

export const trainSchemaValidator = Joi.object({
  trainId: Joi.string().required(),
  trainName: Joi.string().min(3).max(50).required(),
  imagePath: Joi.string(),
})

const Train = model('Train', trainSchema)

export default Train
