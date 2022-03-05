import { IEvent } from 'src/types/event.type'

const isDateBeforeToday = (date: Date) => {
  return new Date(date.toDateString()) < new Date(new Date().toDateString())
}

const getTicketPrice = (event: IEvent): number => {
  if (!event?.isEarlyPrice || !event?.earlyDeadline) {
    return event.price || 0
  }

  const isEarly = !isDateBeforeToday(new Date(event.earlyDeadline))

  if (isEarly && event.earlyPrice) return event.earlyPrice
  return event.price || 0
}

export default getTicketPrice
