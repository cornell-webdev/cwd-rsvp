import { Request } from 'express'
import { Document } from 'mongoose'

export interface ITaskDocument extends Document, ITask {}

export interface ITask {
  userId: string
  isComplete: boolean
  startTime: string
  endTime: string
  name: string
  due: Date | null
  notes: string
  isRecur: boolean
  isArchived: boolean
  provider?: string
  providerTaskId?: string
  providerData?: any
}

export interface IScheduleTasks {
  [id: string]: ITaskDocument[]
}

export interface IFetchGcalTasksParams {
  req: Request
  due: Date
  isTimed: boolean
}
