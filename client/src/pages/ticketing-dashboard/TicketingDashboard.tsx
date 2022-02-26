import { Button, Text, theme } from 'cornell-glue-ui'
import React from 'react'
import { Link } from 'react-router-dom'
import { useEventById } from 'src/api/event'
import BackButton from 'src/components/BackButton'
import PageContainer from 'src/components/layout/PageContainer'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'
import SellersLinkForm from './SellersLinkForm'
import TicketSalesList from './TicketSalesList'

const TicketingDashboard = () => {
  const router = useRouter()
  const eventId = router.match.params.eventId
  const { event } = useEventById(eventId)
  console.log('event', event)

  return (
    <Container>
      <PageContainer isMobileOnly>
        <Section>
          <BackButton onClick={() => router.push('/profile/my-events')} />
          <div>
            <Text color={theme.text.muted}>Event dashboard</Text>
            <Text variant='h4' fontWeight={700}>
              {event?.title}
            </Text>
          </div>
          <Link to={`/event/${event?._id}`}>
            <Button>View event</Button>
          </Link>
        </Section>
        <Section>
          <Text variant='h4' fontWeight={700}>
            Seller's link
          </Text>
          <Text>
            Tickets purchased through the seller’s link will attribute the ticket sale to the
            seller.
          </Text>
          <div>
            <SellersLinkForm />
          </div>
        </Section>
        <Section>
          <Text variant='h4' fontWeight={700}>
            Sellers
          </Text>
        </Section>
        <Section>
          <Text variant='h4' fontWeight={700}>
            Ticket sales
          </Text>
          <TicketSalesList eventId={eventId} ticketsTotalCount={event?.totalTicketCount} />
        </Section>
        <Section>
          <Text variant='h4' fontWeight={700}>
            Participants
          </Text>
        </Section>
      </PageContainer>
    </Container>
  )
}

const Container = styled.div`
  background: ${(props) => props.theme.grey[50]};
  min-height: 100vh;
`

const Section = styled.section`
  background: ${(props) => props.theme.background.default};
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  box-shadow: ${(props) => props.theme.shadow.default};

  & > * {
    margin-bottom: 1rem;
  }
`

export default TicketingDashboard
