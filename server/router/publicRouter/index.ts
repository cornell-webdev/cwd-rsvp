import express from 'express'
import authRouter from './authRouter'
import eventRouter from './eventRouter'

const publicRouter = express.Router()

publicRouter.use('/auth', authRouter)
publicRouter.use('/event', eventRouter)

export default publicRouter
