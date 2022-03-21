import express from 'express'
import Event from '../../models/Event'
import endOfDay from 'date-fns/endOfDay'
import startOfDay from 'date-fns/startOfDay'
import Org from '../../models/Org'
import { IEvent } from '../../types/event.type'
import sendTicketEmail from '../../util/email/sendTicketEmail'

const eventRouter = express.Router()

eventRouter.get('/trending', async (req, res) => {
  try {
    const docs = await Event.find({
      dates: {
        $elemMatch: {
          date: {
            $gte: startOfDay(new Date()),
          },
        },
      },
    })
      .sort({ likedUserIds: -1 })
      .limit(10)
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
})

eventRouter.get('/search', async (req, res) => {
  try {
    if (!req.query?.query || req.query.query === '') {
      res.send([])
    } else {
      const orgs = await Org.find({
        name: { $regex: req.query.query as string, $options: 'i' },
      })
      const uniqueEvents: IEvent[] = []
      const eventIds: { [id: string]: boolean } = {}
      const orgPromises = orgs.map(async (org) => {
        const events = await Event.find({ orgId: org?._id })
        events?.forEach((event) => {
          eventIds[event?._id.toString()] = true
          uniqueEvents.push(event)
        })
      })
      await Promise.all(orgPromises)
      const events = await Event.find({
        $or: [
          // { details: { $regex: req.query.query as string, $options: 'i' } },
          { title: { $regex: req.query.query as string, $options: 'i' } },
          { location: { $regex: req.query.query as string, $options: 'i' } },
        ],
      })
      events.forEach((event) => {
        if (!eventIds[event?._id.toString()]) {
          uniqueEvents.push(event)
        }
      })
      res.send(uniqueEvents)
    }
  } catch (e) {
    res.status(500).send(e)
  }
})

eventRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Event.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

eventRouter.get('/', async (req, res) => {
  try {
    const dateQuery = req.query.date
      ? {
          dates: {
            $elemMatch: {
              date: {
                $gte: startOfDay(new Date(req.query.date as string)),
                $lt: endOfDay(new Date(req.query.date as string)),
              },
            },
          },
        }
      : {}

    const tagQuery =
      req.query.tagId !== 'undefined'
        ? {
            tagId: req.query.tagId as string,
          }
        : {}

    const query = {
      ...dateQuery,
      ...tagQuery,
    }

    const docs = await Event.find(query).sort({ isTicketed: -1 })
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
})

eventRouter.put('/:id', async (req, res) => {
  try {
    const doc = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.send(doc)
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

eventRouter.post('/increment-views', async (req, res) => {
  try {
    const event = await Event.findById(req.body._id)
    if (event) {
      const doc = await Event.findByIdAndUpdate(
        req.body._id,
        { views: event.views + 1 },
        {
          new: true,
        }
      )
      res.send(doc)
    } else {
      res.status(400).send('Invalid event id')
    }
  } catch (e) {
    res.status(500).send(e)
  }
})

export default eventRouter
