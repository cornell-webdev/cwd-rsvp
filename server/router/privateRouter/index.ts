import express from 'express'
import passport from 'passport'
import userRouter from './userRouter'
import tagRouter from './tagRouter'

const privateRouter = express.Router()

// authorization
privateRouter.use(passport.authenticate('jwt', { session: false }))

privateRouter.use('/user', userRouter)
privateRouter.use('/tag', tagRouter)

export default privateRouter
