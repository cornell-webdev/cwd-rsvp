import express, { Router } from 'express'
import privateRouter from './privateRouter'
import publicRouter from './publicRouter'

const router: Router = express.Router()

router.use('/public', publicRouter)
router.use('/private', privateRouter)

router.get('/ping', (_, res) => res.send('pong'))

export default router
