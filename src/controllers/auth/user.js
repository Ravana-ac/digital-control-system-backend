import User from '../../models/user.js'

export const allUsers = async (req, res, next) => {
  const users = await User.find({})
  res.json({ users: users })
}
