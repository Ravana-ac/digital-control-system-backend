import express from 'express'
import { addTrain } from '../controllers/train.js'
import checkAuth from '../middlewares/checkAuth.js'
import upload from '../middlewares/upload.js'

const router = express.Router()

router.get('/add', checkAuth, upload.single('image'), addTrain)

export default router
