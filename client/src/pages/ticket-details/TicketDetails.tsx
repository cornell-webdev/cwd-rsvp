import React from 'react'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'
import QRCode from 'react-qr-code'
import PageContainer from 'src/components/layout/PageContainer'
import BackButton from 'src/components/BackButton'
import { Button, FlexContainer, Spacer, Text, theme } from 'cornell-glue-ui'
import { useTicketById } from 'src/api/ticket'
import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined'
import LocationIcon from '@mui/icons-material/LocationOnOutlined'
import { getEventDate, getEventTime } from 'src/util/date'
import { Link } from 'react-router-dom'

const TicketDetails = () => {
  const router = useRouter()
  const ticketId = router.match.params.ticketId
  const { ticket, error } = useTicketById(ticketId)

  if (error?.response?.status === 401) {
    return (
      <PageContainer isMobileOnly>
        <Text>Unauthorized.</Text>
        <Text>Sign in with the account that purchased this ticket to view ticket.</Text>
      </PageContainer>
    )
  }

  if (!ticket) {
    return (
      <PageContainer isMobileOnly>
        <Text>Invalid ticket</Text>
      </PageContainer>
    )
  }

  return (
    <PageContainer isMobileOnly>
      <BackButton onClick={() => router.push('/profile/my-tickets')} />
      <Spacer y={4} />
      <FlexContainer flexDirection='column' alignCenter>
        <Text variant='h5' fontWeight={700}>
          {ticket?.name}
        </Text>
        <Spacer y={0.5} />
        <Text color={theme.text.muted}>{ticket?.email}</Text>
        <QRContainer>
          <QRCode value={`https://cornellrsvp.com/check-in/${ticketId}`} />
        </QRContainer>
        <Text color={theme.text.muted} textAlign='center'>
          Show this QR code to the organizer to check-in to the event
        </Text>
        <Divider />
      </FlexContainer>
      <Text variant='h4' fontWeight={700}>
        {ticket?.event?.title}
      </Text>
      <Spacer y={1} />
      <FlexContainer alignCenter>
        <StyledCalendarIcon />
        <Spacer x={0.5} />
        <Text>
          {getEventTime(ticket.event.dates[0].startTime)} -{' '}
          {getEventTime(ticket.event.dates[0].endTime)}, {getEventDate(ticket.event.dates[0].date)}
        </Text>
      </FlexContainer>
      <Spacer y={0.5} />
      <FlexContainer alignCenter>
        <StyledLocationIcon />
        <Spacer x={0.5} />
        <Text>{ticket?.event?.location}</Text>
      </FlexContainer>
      <Spacer y={1.25} />
      <Link to={`/event/${ticket?.event?._id}`} target='_blank' rel='noopener noreferrer'>
        <Button>View event</Button>
      </Link>
      <Spacer y={3} />
      <Text variant='h4' fontWeight={700}>
        Check-in instructions
      </Text>
      <Spacer y={0.5} />
      <Text>{ticket?.event?.checkInInstructions}</Text>
      <Spacer y={4} />
    </PageContainer>
  )
}

const QRContainer = styled.div`
  margin: 4rem 0;
`

const Divider = styled.div`
  width: 100%;
  margin-top: 5rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid ${(props) => props.theme.border.default};
`

const StyledCalendarIcon = styled(CalendarIcon)`
  fill: ${(props) => props.theme.text.default} !important;
`

const StyledLocationIcon = styled(LocationIcon)`
  fill: ${(props) => props.theme.text.default} !important;
`

export default TicketDetails
