import { Document } from 'mongoose'
import { IUserDocument } from './user.type'

export interface IOrgDocument extends Document, IOrg {}

export interface IOrg {
  name: string
  desc: string
  linkedUserIds: string[]
  linkedUsers: IUserDocument[]
  avatar?: string
  email?: string
  provider?: 'campusgroups'
  providerId?: string
  providerData?: any
}
