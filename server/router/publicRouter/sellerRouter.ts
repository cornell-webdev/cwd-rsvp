import express from 'express'
import Seller from '../../models/Seller'
import Ticket from '../../models/Ticket'
import { ISellerStat } from '../../types/seller.type'

const sellerRouter = express.Router()

sellerRouter.get('/event/:eventId/stats', async (req, res) => {
  try {
    let sellers
    if (req.query?.filterString) {
      sellers = await Seller.find({
        eventId: req.params?.eventId,
        fullName: { $regex: req.query?.filterString as string, $options: 'i' },
      })
    } else {
      sellers = await Seller.find({ eventId: req.params?.eventId })
    }

    let counts: ISellerStat[] = []

    const promises = sellers?.map(async (seller) => {
      const tickets = await Ticket.find({
        eventId: req.params?.eventId,
        sellerId: seller?._id,
      })
      counts.push({
        _id: seller?._id,
        fullName: seller?.fullName,
        soldCount: tickets?.length || 0,
      })
    })

    await Promise.all(promises)
    counts.sort((a, b) => b.soldCount - a.soldCount)

    if (req.query?.isReversed === 'true') {
      counts.reverse()
    }

    if (req.query?.isShowAll !== 'true') {
      counts = counts.slice(0, 3)
    }

    res.send(counts)
  } catch (e) {
    res.status(500).send(e)
  }
})

sellerRouter.get('/event/:eventId', async (req, res) => {
  try {
    const sellers = await Seller.find({ eventId: req.params?.eventId })
    res.send(sellers)
  } catch (e) {
    res.status(500).send(e)
  }
})

sellerRouter.get('/:sellerId', async (req, res) => {
  try {
    const seller = await Seller.findById(req.params?.sellerId)
    res.send(seller)
  } catch (e) {
    res.status(500).send(e)
  }
})

sellerRouter.put('/generate', async (req, res) => {
  try {
    const existingSeller = await Seller.findOne({
      netId: req.body?.netId,
      eventId: req.body?.eventId,
    })

    if (existingSeller) {
      res.send(existingSeller)
    } else {
      const seller = await new Seller(req.body).save()
      res.send(seller)
    }
  } catch (e) {
    res.status(500).send(e)
  }
})

export default sellerRouter
