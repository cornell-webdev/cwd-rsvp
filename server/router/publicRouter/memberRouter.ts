import express from 'express'
import Member from '../../models/Member'

const memberRouter = express.Router()

memberRouter.get('/:name', async (req, res) => {
  try {
    const member = await Member.findOne({ name: req.params.name })
    res.send(member)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default memberRouter
