import express from 'express'
import Seller from '../../models/Seller'

const sellerRouter = express.Router()

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
