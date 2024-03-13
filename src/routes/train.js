import express from 'express'
import { addTrain } from '../controllers/train.js'
import checkAuth from '../middlewares/checkAuth.js'

const router = express.Router()

router.get('/add', checkAuth, addTrain)

export default router
