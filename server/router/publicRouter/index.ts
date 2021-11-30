import express from 'express'
import authRouter from './authRouter'
import eventRouter from './eventRouter'
import tagRouter from './tagRouter'

const publicRouter = express.Router()

publicRouter.use('/auth', authRouter)
publicRouter.use('/event', eventRouter)
publicRouter.use('/tag', tagRouter)

export default publicRouter
