import express from 'express'

import { register } from '../../controllers/auth/register.js'
import { login } from '../../controllers/auth/login.js'
import { allUsers } from '../../controllers/auth/user.js'
import checkAuth from '../../middlewares/checkAuth.js'

const authRouter = express.Router()

authRouter.post('/register', register)
authRouter.post('/login', login)
authRouter.get('/users', checkAuth, allUsers)

export default authRouter
