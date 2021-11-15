import { Document } from 'mongoose'

export interface ITag extends Document {
  userId: string
  label: string
}
