import express from 'express'
import Member from '../../models/Member'

const memberRouter = express.Router()

memberRouter.delete('/delete', async (req, res) => {
  try {
    const result = await Member.findOneAndDelete(req.body)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default memberRouter
