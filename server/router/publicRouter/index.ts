import express from 'express'
import authRouter from './authRouter'
import eventRouter from './eventRouter'
import tagRouter from './tagRouter'
import orgRouter from './orgRouter'
import ticketRouter from './ticketRouter'
import sellerRouter from './sellerRouter'
import memberRouter from './memberRouter'

const publicRouter = express.Router()

publicRouter.use('/auth', authRouter)
publicRouter.use('/event', eventRouter)
publicRouter.use('/tag', tagRouter)
publicRouter.use('/org', orgRouter)
publicRouter.use('/ticket', ticketRouter)
publicRouter.use('/seller', sellerRouter)
publicRouter.use('/member', memberRouter)

export default publicRouter
