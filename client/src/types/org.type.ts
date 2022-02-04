import { IDocument } from './index.type'
import { IUser } from './user.type'

export interface IOrg extends IDocument {
  name: string
  desc: string
  website?: string
  linkedUserIds: string[]
  linkedUsers: string[]
  avatar?: string
  provider?: 'campusgroups'
  providerId?: string
  providerData?: any
}

export interface IOrgLinkedUsers {
  linkedUserIds: string[]
  linkedUsers: IUser[]
}
