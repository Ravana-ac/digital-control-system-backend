import express from 'express'
import cors from 'cors'

import homeRouter from './routes/home.js'
import authRouter from './routes/auth/auth-routes.js'
import trainRouter from './routes/train.js'

const app = express()

app.set('view engine', 'ejs')
app.use(cors())
app.use(express.json())

app.use('/', homeRouter)
app.use('/auth', authRouter)
app.use('/train', trainRouter)

export default app
