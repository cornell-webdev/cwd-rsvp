import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { ITicket } from 'src/types/ticket.type'

export const useCreateTicket = () => {
  const { mutateAsync: createTicketAsync, ...rest } = useCustomMutation<ITicket>({
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
  url: `/public/ticket/${ticketId}`,
})

export const useTicketById = (ticketId: string) => {
  const { data: ticket, ...rest } = useCustomQuery<ITicket>(ticketByIdQueryConfig(ticketId))

  return {
    ...rest,
    ticket,
  }
}

interface IEventTicketStatsResponse {
  revenue: string
  soldCount: string
  checkinCount: string
}

export const ticketStatsByEventIdQueryConfig = (eventId: string) => ({
  url: `/public/ticket/event/${eventId}/ticket-stats`,
})

export const useTicketStatsByEventId = (eventId: string) => {
  const { data, ...rest } = useCustomQuery<IEventTicketStatsResponse>(
    ticketStatsByEventIdQueryConfig(eventId)
  )

  return {
    ...rest,
    revenue: data?.revenue,
    soldCount: data?.soldCount,
    checkinCount: data?.checkinCount,
  }
}

interface IEventTicketsResponse {
  tickets: ITicket[]
}

interface IUseTicketsByEventIdParams {
  eventId: string
  count: string
  filterString?: string
  isOnlyCheckedIn?: string
}

export const ticketsByEventIdQueryConfig = (params: IUseTicketsByEventIdParams) => ({
  url: `/public/ticket/event/${params?.eventId}/tickets?${new URLSearchParams({
    ...params,
  }).toString()}`,
})

export const useTicketsByEventId = (params: IUseTicketsByEventIdParams) => {
  const { data, ...rest } = useCustomQuery<IEventTicketsResponse>(
    ticketsByEventIdQueryConfig(params)
  )

  return {
    ...rest,
    tickets: data?.tickets,
  }
}

export const useCheckinTicket = () => {
  const { mutateAsync: checkinTicketAsync, ...rest } = useCustomMutation<
    ITicket,
    { ticketId: string; isCheckedIn: boolean }
  >({
    url: `/public/ticket/check-in`,
    method: 'put',
  })

  return {
    ...rest,
    checkinTicketAsync,
  }
}

export const hasSoldTicketQueryConfig = (eventId: string) => ({
  url: `/private/ticket/event/${eventId}/has-sold-ticket`,
  options: {
    enabled: !!eventId,
  },
})

export const useHasSoldTicket = (eventId: string) => {
  const { data: hasSoldTicket, ...rest } = useCustomQuery<boolean>(
    hasSoldTicketQueryConfig(eventId)
  )

  return {
    ...rest,
    hasSoldTicket,
  }
}

export const participantEmailsQueryConfig = (eventId: string) => ({
  url: `/public/ticket/event/${eventId}/participant-emails`,
  options: {
    enabled: !!eventId,
  },
})

export const useParticipantEmails = (eventId: string) => {
  const { data: emails, ...rest } = useCustomQuery<string[]>(participantEmailsQueryConfig(eventId))

  return {
    ...rest,
    emails,
  }
}
