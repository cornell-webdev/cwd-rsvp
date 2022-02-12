import { Document } from 'mongoose'

export interface ITicketDocument extends Document, ITicket {}

export interface ITicket {
  eventId: string
  userId: string
  sellerId: string
  fullName: string
  name: string
  email: string
  pricePaid: number
  isCheckedIn: boolean
}
