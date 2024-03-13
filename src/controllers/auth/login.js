import 'dotenv/config.js'
import User from '../../models/user.js'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  if (!(email && password)) {
    return res.json({ error: 'invalid body params' })
  }

  const e = await User.findOne({ email: email })
  if (!e) {
    return res.json({ error: 'invalid username' })
  }

  const pwdMatch = await bcrypt.compare(password, e.password)

  if (!pwdMatch) {
    return res.json({ error: 'incorrect password' })
  }

  const secret = process.env.JWT_SECRET
  const payload = {
    username: e.username,
    email: e.email,
    id: e._id,
  }

  const token = jwt.sign(payload, secret)

  return res.json({ message: 'login success', token: token })
}
