import express from 'express'
import Member from '../../models/Member'

const memberRouter = express.Router()

memberRouter.post('/', async (req, res) => {
  try {
    const member = await new Member({
      ...req.body,
    }).save()
    res.send(member)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default memberRouter
