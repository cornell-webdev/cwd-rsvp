import express from 'express'
import Event from '../../models/Event'
import Org from '../../models/Org'

const eventRouter = express.Router()

eventRouter.post('/toggle-like', async (req, res) => {
  try {
    const event = await Event.findById(req?.body?._id)
    const targetId = req?.user?._id.toString()

    if (event) {
      if (event.likedUserIds.includes(targetId)) {
        event.likedUserIds = event.likedUserIds.filter((id) => id !== targetId)
        await event.save()
      } else {
        event.likedUserIds = [...event.likedUserIds, targetId]
        await event.save()
      }
    }
    res.send(event)
  } catch (e) {
    res.status(500).send(e)
  }
})

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
    const linkedOrgs = await Org.find({ linkedUserIds: req.user?._id })
    const linkedEventQueries = linkedOrgs?.map((org) => ({
      orgId: org?._id,
    }))
    const query = { $or: [{ userId: req.user?._id }, ...linkedEventQueries] }
    const myEvents = await Event.find(query).sort({ createdAt: -1 })
    res.send(myEvents)
  } catch (e) {
    res.status(500).send(e)
  }
})

eventRouter.get('/liked-events', async (req, res) => {
  try {
    const events = await Event.find({ likedUserIds: req.user?._id })
    res.send(events)
  } catch (e) {
    res.status(500).send(e)
  }
})

eventRouter.delete('/', async (req, res) => {
  try {
    const result = await Event.findByIdAndDelete(req?.body?._id)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

eventRouter.put('/:id/update', async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(event)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default eventRouter
