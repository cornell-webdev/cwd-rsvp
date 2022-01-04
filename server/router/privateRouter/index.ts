import express from 'express'
import passport from 'passport'
import userRouter from './userRouter'
import eventRouter from './eventRouter'
import orgRouter from './orgRouter'

const privateRouter = express.Router()

// authorization
privateRouter.use(passport.authenticate('jwt', { session: false }))

// routes
privateRouter.use('/user', userRouter)
privateRouter.use('/event', eventRouter)
privateRouter.use('/org', orgRouter)

export default privateRouter
