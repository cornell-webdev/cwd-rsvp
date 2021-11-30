import { Document } from 'mongoose'

export interface ITagDocument extends Document, ITag {}

export interface ITag {
  name: string
  color?: string
  backgroundColor?: string
}
