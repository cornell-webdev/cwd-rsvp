import express from 'express'
import User from '../../models/User'
import substringQuery from '../../util/substringQuery'

const userRouter = express.Router()

userRouter.post('/', async (req, res) => {
  try {
    const doc = await new User(req.body).save()
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

userRouter.get('/', async (req, res) => {
  try {
    const docs = await User.find(substringQuery(req.query, ['']))
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
})

userRouter.get('/current', async (req, res) => {
  try {
    res.send(req.user)
  } catch (e) {
    res.status(500).send(e)
  }
})

userRouter.get('/:id', async (req, res) => {
  try {
    const doc = await User.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

userRouter.put('/:id', async (req, res) => {
  try {
    const note = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(note)
  } catch (e) {
    res.status(500).send(e)
  }
})

userRouter.delete('/:id', async (req, res) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default userRouter
