import { IDocument } from './index.type'

export interface ITask extends IDocument {
  userId: string
  isComplete: boolean
  startTime: string
  endTime: string
  name: string
  due: string | null
  notes: string
  isRecur: boolean
  isArchived: boolean
  provider?: 'google'
  providerTaskId?: string | null
  providerData?: any
}

export interface IScheduleTasks {
  [id: string]: ITask[]
}

export type IInboxState =
  | 'CREATE'
  | 'NAVIGATE'
  | 'EDIT_NAME'
  | 'EDIT_NOTES'
  | 'EDIT_TIME'
  | 'EDIT_DUE'

export interface IUseUpdateInboxTaskByIdOptions {
  due: Date | null
  refetchOnSettle?: boolean
}

export interface IUseProsysTasksParams {
  due: Date | null
  isTimed: boolean
}

export interface IInsertTaskProps {
  tasks: ITask[]
  newTask: ITask
}
