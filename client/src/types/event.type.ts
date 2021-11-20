import { IDocument } from './index.type'
import { IOrg } from './org.type'
import { ITag } from './tag.type'

export interface IEvent extends IDocument {
  orgId: string
  org: IOrg
  title: string
  isVirtual: boolean
  location: string
  meetingUrl?: string
  tagId?: string
  tag: ITag
  dates: Date[]
  startTime: string
  endTime: string
  details: string
  imgs: string[]
  views: number
  likedUserIds: string[]
  provider?: 'campusgroups'
  providerId?: string
  providerUrl?: string
  providerData?: any
}
