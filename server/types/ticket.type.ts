import { Document } from 'mongoose'
import { IUserDocument } from './user.type'

export interface ITicketDocument extends Document, ITicket {}

export interface ITicket {
  eventId: string
  userId: string
  user: IUserDocument
  sellerId: string
  name: string
  email: string
  pricePaid: number
  isCheckedIn: boolean
}
