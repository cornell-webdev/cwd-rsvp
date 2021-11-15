import { Document } from 'mongoose'

export interface ITagDocument extends Document {
  userId: string
  label: string
}
