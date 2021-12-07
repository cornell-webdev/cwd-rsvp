import { Document } from 'mongoose'

export interface IEventDocument extends Document, IEvent {}

export interface IEventDate {
  date: Date
  startTime: string
  endTime: string
}

export interface IEvent {
  orgId: string
  title: string
  isVirtual: boolean
  location: string
  meetingUrl?: string
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
}
