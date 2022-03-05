import { model, Schema } from 'mongoose'
import { ITicketDocument } from '../types/ticket.type'
import User from './User'
import Event from './Event'
import Seller from './Seller'

const ticketSchema = new Schema(
  {
    eventId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    sellerId: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    pricePaid: {
      type: Number,
      required: true,
    },
    isCheckedIn: {
      type: Boolean,
      default: false,
    },
    providerId: {
      type: String,
    },
    providerData: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
)

ticketSchema.virtual('event', {
  ref: Event,
  localField: 'eventId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
})

ticketSchema.virtual('user', {
  ref: User,
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
})

ticketSchema.virtual('seller', {
  ref: Seller,
  localField: 'sellerId',
  foreignField: '_id',
  justOne: true,
  autopopulate: true,
})

ticketSchema.plugin(require('mongoose-autopopulate'))

export default model<ITicketDocument>('Ticket', ticketSchema)
