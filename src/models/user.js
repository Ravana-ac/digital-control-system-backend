import { Schema, model } from 'mongoose';
import Joi from 'joi';

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

export const userSchemaValidator = new Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const User = new model('user', userSchema);

export default User;
