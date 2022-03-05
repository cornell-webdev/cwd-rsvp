import express from 'express'
import Ticket from '../../models/Ticket'

const ticketRouter = express.Router()

ticketRouter.get('/event/:eventId', async (req, res) => {
  try {
    const allTickets = await Ticket.find({ eventId: req.params?.eventId })
    const revenue = allTickets?.reduce((prev, ticket) => prev + ticket?.pricePaid, 0)
    const checkinCount = allTickets?.reduce(
      (prev, ticket) => prev + (ticket?.isCheckedIn ? 1 : 0),
      0
    )
    let tickets

    if (req.query?.filterString) {
      tickets = await Ticket.find({
        eventId: req.params?.eventId,
        name: { $regex: req.query?.filterString as string, $options: 'i' },
      }).sort({ createdAt: -1 })
    } else {
      tickets = await Ticket.find({ eventId: req.params?.eventId })
        .sort({ createdAt: -1 })
        .limit(Number(req?.query?.count))
    }

    res.send({
      tickets,
      revenue,
      checkinCount,
      soldCount: allTickets?.length,
    })
  } catch (e) {
    res.status(500).send(e)
  }
})

ticketRouter.put('/check-in', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.body?.ticketId, { isCheckedIn: true })
    res.send(ticket)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default ticketRouter
