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
