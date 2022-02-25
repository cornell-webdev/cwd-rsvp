import express from 'express'
import Ticket from '../../models/Ticket'

const ticketRouter = express.Router()

ticketRouter.post('/', async (req, res) => {
  try {
    const ticket = await new Ticket({
      ...req.body,
      userId: req.user?._id,
    }).save()

    res.send(ticket)
  } catch (e) {
    res.status(500).send(e)
  }
})

ticketRouter.get('/:ticketId', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params?.ticketId)
    if (ticket?.user?._id?.toString() !== req?.user?._id?.toString()) {
      res.status(401).send('Unauthorized')
    } else {
      res.send(ticket)
    }
  } catch (e) {
    res.status(500).send(e)
  }
})

ticketRouter.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find({ userId: req.user?._id })
    res.send(tickets)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default ticketRouter
