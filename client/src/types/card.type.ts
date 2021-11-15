import { ITag } from './tag.type'
import { Document } from 'mongoose'

export interface ICodableTextareaBlock {
  type: 'TEXT' | 'CODE'
  value: string
}

export type ICardStatus = 'COLLAPSED' | 'EXPANDED' | 'FLIPPED' | 'EDITING'

export interface ICard extends Document {
  userId: string
  question: ICodableTextareaBlock[]
  answer: ICodableTextareaBlock[]
  isLearning: boolean
  isDeleted: boolean
  tags: ITag[]
  repAt: Date
  repSpace: number
  repCount: number
}

export interface IUseUpdateCardByIdOptions {
  refetchOnSettle?: boolean
  isNotUpdateLocal?: boolean
}
