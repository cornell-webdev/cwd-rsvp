import { model, Schema } from 'mongoose'
import { ISellerDocument } from '../types/seller.type'
import Event from './Event'

const sellerSchema = new Schema(
  {
    eventId: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    netId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

sellerSchema.virtual('event', {
  ref: Event,
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
})

sellerSchema.plugin(require('mongoose-autopopulate'))

export default model<ISellerDocument>('Seller', sellerSchema)
