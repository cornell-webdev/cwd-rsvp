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

export default orgRouter
