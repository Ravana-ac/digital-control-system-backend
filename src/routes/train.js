import express from 'express'
import { addTrain, getAllTrains } from '../controllers/train.js'
import checkAuth from '../middlewares/checkAuth.js'
import upload from '../middlewares/upload.js'

const router = express.Router()

router.post('/add', checkAuth, upload.single('image'), addTrain)
router.get('/all', getAllTrains)

export default router
