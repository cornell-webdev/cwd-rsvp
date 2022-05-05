import express from 'express'
import Ticket from '../../models/Ticket'

const ticketRouter = express.Router()

ticketRouter.get('/event/:eventId/ticket-stats', async (req, res) => {
  try {
    const allTickets = await Ticket.find({ eventId: req.params?.eventId })
    let revenue = 0
    let checkinCount = 0
    allTickets.forEach((ticket) => {
      revenue += ticket?.pricePaid
      if (ticket?.isCheckedIn) checkinCount += 1
    })

    res.send({
      revenue,
      checkinCount,
      soldCount: allTickets?.length,
    })
  } catch (e) {
    res.status(500).send(e)
  }
})

ticketRouter.get('/event/:eventId/tickets', async (req, res) => {
  try {
    const checkInQuery = req?.query?.isOnlyCheckedIn === 'true' ? { isCheckedIn: true } : {}

    let tickets

    if (req.query?.filterString) {
      tickets = await Ticket.find({
        eventId: req.params?.eventId,
        name: { $regex: req.query?.filterString as string, $options: 'i' },
        ...checkInQuery,
      }).sort({ createdAt: -1 })
    } else {
      tickets = await Ticket.find({ eventId: req.params?.eventId, ...checkInQuery })
        .sort({ createdAt: -1 })
        .limit(Number(req?.query?.count))
    }

    res.send({
      tickets,
    })
  } catch (e) {
    res.status(500).send(e)
  }
})

ticketRouter.get('/event/:eventId/participant-emails', async (req, res) => {
  try {
    const allTickets = await Ticket.find({ eventId: req.params?.eventId })
    const participantEmails = allTickets?.map((ticket) => ticket?.user?.email)
    res.send(participantEmails)
  } catch (e) {
    res.status(500).send(e)
  }
})

ticketRouter.get('/:ticketId', async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params?.ticketId)
    res.send(ticket)
  } catch (e) {
    res.status(500).send(e)
  }
})

ticketRouter.put('/check-in', async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.body?.ticketId, {
      isCheckedIn: req?.body?.isCheckedIn,
    })
    res.send(ticket)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default ticketRouter
