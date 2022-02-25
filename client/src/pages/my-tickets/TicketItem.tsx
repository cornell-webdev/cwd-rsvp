import { Text, theme } from 'cornell-glue-ui'
import React from 'react'
import { Link } from 'react-router-dom'
import { ITicket } from 'src/types/ticket.type'
import { getEventDate, getEventTime } from 'src/util/date'
import getEventThumbnail from 'src/util/getEventThumbnail'
import styled from 'styled-components'

interface ITicketItemProps {
  ticket: ITicket
}

const TicketItem = ({ ticket }: ITicketItemProps) => {
  console.log('ticket', ticket)
  return (
    <StyledLink to={`/profile/ticket-details/${ticket?._id}`}>
      <Container>
        <Thumbnail src={getEventThumbnail(ticket?.event)} />
        <TextContainer>
          <Text variant='h6' fontWeight={700}>
            {ticket?.event?.title}
          </Text>
          <Text variant='meta1' color={theme.text.muted}>
            {getEventTime(ticket?.event?.dates[0]?.startTime)} -{' '}
            {getEventTime(ticket?.event?.dates[0]?.endTime)},{' '}
            {getEventDate(ticket?.event?.dates[0]?.date)}
          </Text>
          <Text variant='meta1' color={theme.text.muted}>
            {ticket?.event?.location}
          </Text>
        </TextContainer>
      </Container>
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  display: block;
  width: 100%;
  margin-bottom: 1rem;
`

const Container = styled.div`
  width: 100%;
  padding: 0.7rem 0.375rem;
  cursor: pointer;
  border-radius: 8px;
  display: flex;
  background: ${(props) => props.theme.brand[25]};

  @media (min-width: ${(props) => props.theme.small}) {
    &:hover {
      background: ${(props) => props.theme.brand[50]};
    }
  }
`

const Thumbnail = styled.img`
  border-radius: 6px;
  min-width: 87px;
  width: 25%;
  margin-right: 10px;
  object-fit: cover;
  border: 1px solid ${(props) => props.theme.border.default};
  height: 76px;

  @media (min-width: ${(props) => props.theme.small}) {
    height: 120px;
  }
`

const TextContainer = styled.div`
  width: 75%;
`

export default TicketItem
