import { IDocument } from './index.type'

export interface IOrg extends IDocument {
  name: string
  desc: string
  linkedUserIds: string[]
  avatar?: string
  email?: string
  provider?: 'campusgroups'
  providerId?: string
  providerData?: any
}
