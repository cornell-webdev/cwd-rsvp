import { IDocument } from './index.type'

export interface IUser extends IDocument {
  authProvider: 'google'
  providerId?: string
  providerData?: any
}
