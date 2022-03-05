import { IEvent } from './event.type'
import { IDocument } from './index.type'
import { ISeller } from './seller.type'
import { IUser } from './user.type'

export interface ITicket extends IDocument {
  eventId: string
  event: IEvent
  userId: string
  user: IUser
  sellerId: string
  seller: ISeller
  name: string
  email: string
  pricePaid: number
  isCheckedIn: boolean
}
