import User, { userSchemaValidator } from '../../models/user.js'
import jwt from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

export const register = async (req, res, next) => {
  const data = userSchemaValidator.validate(req.body)

  const e = await User.find({ email: data.value.email })
  if (e.length > 0) {
    return res.json({ error: 'user exists' })
  }

  const hashedPassword = await bcrypt.hash(data.value.password, 10)
  data.value.password = hashedPassword

  const user = new User(data.value)
  const u = await user.save()

  const secret = process.env.JWT_SECRET
  const payload = {
    username: u.username,
    email: u.email,
    id: u._id,
  }

  const token = jwt.sign(payload, secret)

  res.json({ message: 'registration sucess', token: token })
}
