import { IDocument } from './index.type'
import { IOrg } from './org.type'
import { ITag } from './tag.type'
import { IUser } from './user.type'

export interface IEventDate {
  date: Date
  startTime: string
  endTime: string
}

export interface IEvent extends IDocument {
  orgId: string
  org: IOrg
  title: string
  isVirtual: boolean
  location: string
  meetingUrl?: string
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
}
