import { IDocument } from './index.type'
import { IOrg } from './org.type'
import { ITag } from './tag.type'
import { IUser } from './user.type'

export interface IEventDate {
  date: string | Date
  startTime: string
  endTime: string
}

export interface IEvent extends IDocument {
  userId?: string
  user: IUser
  orgId: string
  org: IOrg
  title: string
  location: string
  tagId?: string
  tag: ITag
  dates: IEventDate[]
  details: string
  imgs: string[]
  views: number
  likedUserIds: string[]
  likedUsers: IUser[]
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
