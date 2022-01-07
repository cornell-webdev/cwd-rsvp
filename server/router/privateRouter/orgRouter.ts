import express from 'express'
import Org from '../../models/Org'
import User from '../../models/User'

const orgRouter = express.Router()

orgRouter.get('/:id/linked-users', async (req, res) => {
  try {
    const org = await Org.findById(req.params.id)
    res.send({
      linkedUserIds: org?.linkedUserIds,
      linkedUsers: org?.linkedUsers,
    })
  } catch (e) {
    res.status(500).send(e)
  }
})

orgRouter.get('/', async (req, res) => {
  try {
    const orgs = await Org.find({ linkedUserIds: req?.user?._id })
    res.send(orgs)
  } catch (e) {
    res.status(500).send(e)
  }
})

orgRouter.put('/:id/update', async (req, res) => {
  try {
    const org = await Org.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.send(org)
  } catch (e) {
    res.status(500).send(e)
  }
})

orgRouter.put('/:id/add-linked-user', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    const org = await Org.findById(req.params.id)

    if (user && org) {
      org.linkedUserIds = [...org?.linkedUserIds, user?._id]
      await org.save()
      res.send(org)
    } else {
      res.status(400).send('Invalid email')
    }
  } catch (e) {
    res.status(500).send(e)
  }
})

orgRouter.put('/:id/remove-linked-user', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    const org = await Org.findById(req.params.id)

    if (user && org) {
      org.linkedUserIds = org?.linkedUserIds?.filter((linkedId) => linkedId !== user._id.toString())
      await org.save()
      res.send(org)
    } else {
      res.status(400).send('Invalid email')
    }
  } catch (e) {
    res.status(500).send(e)
  }
})

orgRouter.post('/', async (req, res) => {
  try {
    const org = await new Org({
      ...req.body,
    }).save()
    res.send(org)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default orgRouter
