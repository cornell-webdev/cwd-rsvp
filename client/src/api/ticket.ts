import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { IEvent } from 'src/types/event.type'
import { ITicket } from 'src/types/ticket.type'

export const useCreateTicket = () => {
  const { mutateAsync: createTicketAsync, ...rest } = useCustomMutation<IEvent>({
    url: '/private/ticket',
    method: 'post',
  })

  return {
    ...rest,
    createTicketAsync,
  }
}

export const myTicketsQueryConfig = () => ({
  url: `/private/ticket`,
})

export const useMyTickets = () => {
  const { data: myTickets, ...rest } = useCustomQuery<ITicket[]>(myTicketsQueryConfig())

  return {
    ...rest,
    myTickets,
  }
}

export const ticketByIdQueryConfig = (ticketId: string) => ({
  url: `/private/ticket/${ticketId}`,
})

export const useTicketById = (ticketId: string) => {
  const { data: ticket, ...rest } = useCustomQuery<ITicket>(ticketByIdQueryConfig(ticketId))

  return {
    ...rest,
    ticket,
  }
}

interface IEventTicketResponse {
  tickets: ITicket[]
  revenue: string
  soldCount: string
}

export const ticketsByEventIdQueryConfig = (
  eventId: string,
  count: number,
  filterString: string
) => ({
  url: `/public/ticket/event/${eventId}?count=${count}&filterString=${filterString}`,
})

export const useTicketsByEventId = (eventId: string, count: number, filterString: string) => {
  const { data, ...rest } = useCustomQuery<IEventTicketResponse>(
    ticketsByEventIdQueryConfig(eventId, count, filterString)
  )

  return {
    ...rest,
    tickets: data?.tickets,
    revenue: data?.revenue,
    soldCount: data?.soldCount,
  }
}
