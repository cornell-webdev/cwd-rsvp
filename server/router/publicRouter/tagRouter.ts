import express from 'express'
import Tag from '../../models/Tag'

const tagRouter = express.Router()

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
    const docs = await Tag.find()
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default tagRouter
