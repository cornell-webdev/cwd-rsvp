import express from 'express'
import Member from '../../models/Member'

const memberRouter = express.Router()

memberRouter.put('/:name', async (req, res) => {
  try {
    const name = { name: req.params.name }
    const doc = await Member.findOneAndUpdate(name, req.body, {
      new: true,
    })
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default memberRouter
