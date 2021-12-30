import express from 'express'
import Event from '../../models/Event'
import endOfDay from 'date-fns/endOfDay'
import startOfDay from 'date-fns/startOfDay'

const eventRouter = express.Router()

// TODO: create event endpoint
// eventRouter.post('/', async (req, res) => {
//   try {
//     const doc = await new Event({
//       ...req.body,
//       userId: req.user?._id,
//     }).save()
//     res.send(doc)
//   } catch (e) {
//     res.status(500).send(e)
//   }
// })

eventRouter.get('/trending', async (req, res) => {
  try {
    const sortedDocs = await Event.aggregate([
      {
        $project: {
          likedUserIds: 1,
          length: { $size: '$likedUserIds' },
        },
      },
      { $sort: { length: -1 } },
      { $limit: 10 },
    ])
    const ids = sortedDocs.map((doc) => doc._id)
    const docs = await Event.find({
      _id: { $in: ids },
    })

    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
})

eventRouter.get('/search', async (req, res) => {
  try {
    const docs = await Event.find({
      $or: [
        { details: { $regex: req.query.query as string, $options: 'i' } },
        { title: { $regex: req.query.query as string, $options: 'i' } },
        { location: { $regex: req.query.query as string, $options: 'i' } },
      ],
    })

    res.send(docs)
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

    const docs = await Event.find(query)
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
