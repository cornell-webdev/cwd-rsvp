import express from 'express'
import Event from '../../models/Event'

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
    const docs = await Event.find()
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

export default eventRouter
