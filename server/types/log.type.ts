import { Document } from 'mongoose'

export interface ILogDocument extends Document, ILog {}

export interface ILog {
  action: string
}
