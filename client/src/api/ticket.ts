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

export const ticketsByEventIdQueryConfig = (eventId: string) => ({
  url: `/public/ticket/event/${eventId}`,
})

export const useTicketsByEventId = (eventId: string) => {
  const { data: tickets, ...rest } = useCustomQuery<ITicket[]>(ticketsByEventIdQueryConfig(eventId))

  return {
    ...rest,
    tickets,
  }
}
