import express from 'express'
import Event from '../../models/Event'

const eventRouter = express.Router()

eventRouter.post('/', async (req, res) => {
  try {
    const event = await new Event({
      ...req.body,
      userId: req.user?._id,
    }).save()
    res.send(event)
  } catch (e) {
    res.status(500).send(e)
  }
})

eventRouter.get('/', async (req, res) => {
  try {
    const events = await Event.find({ userId: req.user?._id })
    res.send(events)
  } catch (e) {
    res.status(500).send(e)
  }
})

eventRouter.delete('/', async (req, res) => {
  try {
    const result = await Event.findByIdAndDelete(req.body)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default eventRouter
