import express from 'express'
import Ticket from '../../models/Ticket'

const ticketRouter = express.Router()

ticketRouter.get('/event/:eventId', async (req, res) => {
  try {
    const allTickets = await Ticket.find({ eventId: req.params?.eventId })
    const revenue = allTickets?.reduce((prev, ticket) => prev + ticket?.pricePaid, 0)
    const tickets = await Ticket.find({ eventId: req.params?.eventId })
      .sort({ createdAt: -1 })
      .limit(Number(req?.query?.count))
    res.send({
      tickets,
      revenue,
      soldCount: allTickets?.length,
    })
  } catch (e) {
    res.status(500).send(e)
  }
})

export default ticketRouter
