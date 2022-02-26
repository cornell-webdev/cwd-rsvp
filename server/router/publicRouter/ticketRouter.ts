import express from 'express'
import Ticket from '../../models/Ticket'

const ticketRouter = express.Router()

ticketRouter.get('/event/:eventId', async (req, res) => {
  try {
    const tickets = await Ticket.find({ eventId: req.params?.eventId })
    res.send(tickets)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default ticketRouter
