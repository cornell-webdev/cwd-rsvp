import { Document } from 'mongoose'

export interface IUserDocument extends Document {
  authProvider: 'google'
  providerId?: string
  providerData?: any
}
