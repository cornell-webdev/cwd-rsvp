import { IEvent } from './event.type'
import { IDocument } from './index.type'

export interface ISeller extends IDocument {
  eventId: string
  event: IEvent
  fullName: string
  netId: string
}
