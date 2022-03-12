import { Document } from 'mongoose'

export interface IMemberDocument extends Document, IMember {}

export interface IMember {
  name: string
}
