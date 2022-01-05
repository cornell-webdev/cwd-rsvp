import { IDocument } from './index.type'

export interface IUser extends IDocument {
  name: string
  email: string
  authProvider: 'google'
  providerId?: string
  providerData?: any
}
