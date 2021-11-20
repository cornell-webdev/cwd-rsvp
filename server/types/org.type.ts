import { Document } from 'mongoose'

export interface IOrgDocument extends Document, IOrg {}

export interface IOrg {
  name: string
  desc: string
  linkedUserIds: string[]
  avatar?: string
  email?: string
  provider?: 'campusgroups'
  providerId?: string
  providerData?: any
}
