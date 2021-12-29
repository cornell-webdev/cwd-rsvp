import express from 'express'
import passport from 'passport'
import userRouter from './userRouter'
import eventRouter from './eventRouter'

const privateRouter = express.Router()

// authorization
privateRouter.use(passport.authenticate('jwt', { session: false }))

// routes
privateRouter.use('/user', userRouter)
privateRouter.use('/event', eventRouter)

export default privateRouter
