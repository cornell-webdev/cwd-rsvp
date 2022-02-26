import { Document } from 'mongoose'

export interface IEventDocument extends Document, IEvent {}

export interface IEventDate {
  date: Date
  startTime: string
  endTime: string
}

export interface IEvent {
  userId?: string
  orgId: string
  title: string
  location: string
  tagId?: string
  dates: IEventDate[]
  details: string
  imgs: string[]
  views: number
  likedUserIds: string[]
  provider?: 'campusgroups'
  providerId?: string
  providerUrl?: string
  providerData?: any
  isTicketed: boolean
  totalTicketCount?: number
  price?: number
  isEarlyPrice?: boolean
  earlyPrice?: number
  earlyDeadline?: Date
  venmoId?: string
  checkInInstructions?: string
}
