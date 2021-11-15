import express from 'express'
import Tag from '../../models/Tag'

const tagRouter = express.Router()

tagRouter.post('/', async (req, res) => {
  try {
    const doc = await new Tag({
      ...req.body,
      userId: req.user?._id,
    }).save()
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

tagRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Tag.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

tagRouter.get('/', async (req, res) => {
  try {
    // TODO: sort by most used
    const docs = await Tag.find({
      userId: req.user?._id,
    })
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
})

tagRouter.put('/:id', async (req, res) => {
  try {
    const doc = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

tagRouter.delete('/', async (req, res) => {
  try {
    const result = await Tag.findByIdAndDelete(req.body)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default tagRouter
