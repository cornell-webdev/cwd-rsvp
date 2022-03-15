import express from 'express'
import Event from '../../models/Event'
import Ticket from '../../models/Ticket'
import sendTicketEmail from './../../util/email/sendTicketEmail'

const ticketRouter = express.Router()

ticketRouter.post('/', async (req, res) => {
  try {
    const ticket = await new Ticket({
      ...req.body,
      userId: req.user?._id,
    }).save()

    const event = await Event.findById(req.body?.eventId)

    if (req.user?.email && event?.title) {
      sendTicketEmail({
        email: req.user.email,
        eventName: event.title,
      })
    }
    res.send(ticket)
  } catch (e) {
    res.status(500).send(e)
  }
})

ticketRouter.get('/event/:eventId/has-sold-ticket', async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ eventId: req.params?.eventId })
    if (ticket) {
      res.send(true)
    } else {
      res.send(false)
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
