import express from 'express'
import Org from '../../models/Org'

const orgRouter = express.Router()

orgRouter.get('/:id', async (req, res) => {
  try {
    const org = await Org.findById(req.params.id)
    res.send(org)
  } catch (e) {
    res.status(500).send(e)
  }
})

orgRouter.get('/', async (req, res) => {
  try {
    const orgs = await Org.find()
    res.send(orgs)
  } catch (e) {
    res.status(500).send(e)
  }
})

orgRouter.get('/search', async (req, res) => {
  try {
    if (!req.query?.query || req.query?.query === '') {
      res.send([])
    } else {
      const orgs = await Org.find({
        name: { $regex: req.query.query as string, $options: 'i' },
      })
      res.send(orgs)
    }
  } catch (e) {
    console.log(e)
    res.status(500).send(e)
  }
})

export default orgRouter
