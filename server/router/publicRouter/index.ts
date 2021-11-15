import express from 'express'
import authRouter from './authRouter'

const publicRouter = express.Router()

publicRouter.use('/auth', authRouter)

export default publicRouter
