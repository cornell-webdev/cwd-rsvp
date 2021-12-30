import express from 'express'
import Event from '../../models/Event'

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

export default eventRouter
