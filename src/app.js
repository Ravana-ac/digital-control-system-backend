import express from 'express'
import cors from 'cors'

import homeRouter from './routes/home.js'

const app = express()

app.set('view engine', 'ejs')
app.use(cors())
app.use(express.json())

app.use('/', homeRouter)

export default app
