import { Document } from 'mongoose'

export interface ISellerDocument extends Document, ISeller {}

export interface ISeller {
  eventId: string
  fullName: string
  netId: string
}
