import express from 'express'
import Card from '../../models/Card'
import { Types } from 'mongoose'
import moment from 'moment'

const cardRouter = express.Router()

cardRouter.post('/', async (req, res) => {
  try {
    const doc = await new Card({
      ...req.body,
      userId: req.user?._id,
    }).save()
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

cardRouter.get('/reps', async (req, res) => {
  try {
    const cards = await Card.find({
      userId: req.user?._id,
      isDeleted: false,
      isLearning: true,
      repAt: { $lte: moment(new Date()).endOf('day').toDate() },
      'question.0': { $exists: true },
    }).sort({ createdAt: -1 })
    res.send(cards)
  } catch (e) {
    res.status(500).send(e)
  }
})

cardRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Card.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

cardRouter.get('/', async (req, res) => {
  try {
    const tagIdStrings = req.query?.selectedTagIds
      ? Array.isArray(req.query?.selectedTagIds)
        ? req.query?.selectedTagIds
        : [req.query?.selectedTagIds]
      : []
    const tagsIds = (tagIdStrings as string[])?.map((id: string) =>
      Types.ObjectId(id)
    )
    const tagFilter = tagsIds?.length > 0 ? { tags: { $all: tagsIds } } : {}
    const cards = await Card.find({
      userId: req.user?._id,
      isDeleted: false,
      ...tagFilter,
    })
      .sort({ createdAt: -1 })
      .limit(20)
    res.send(cards)
  } catch (e) {
    res.status(500).send(e)
  }
})

cardRouter.put('/:id', async (req, res) => {
  try {
    const doc = await Card.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

cardRouter.delete('/:id', async (req, res) => {
  try {
    const result = await Card.findByIdAndDelete(req.params.id)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default cardRouter
