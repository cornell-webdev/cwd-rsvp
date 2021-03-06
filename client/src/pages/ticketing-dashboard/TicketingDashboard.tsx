import { Button, FlexContainer, Text, theme } from 'cornell-glue-ui'
import React from 'react'
import { Link } from 'react-router-dom'
import { useEventById } from 'src/api/event'
import BackButton from 'src/components/BackButton'
import PageContainer from 'src/components/layout/PageContainer'
import useIsMobile from 'src/hooks/useIsMobile'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'
import ParticipantList from './ParticipantList'
import SellersLinkForm from './SellersLinkForm'
import SellerStats from './SellerStats'
import TicketSalesList from './TicketSalesList'
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined'
import { useParticipantEmails } from 'src/api/ticket'
import copyToClipboard from 'src/util/copyToClipboard'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { useSnackbar } from 'notistack'

const TicketingDashboard = () => {
  const router = useRouter()
  const eventId = router.match.params.eventId
  const { event } = useEventById(eventId)
  const isMobile = useIsMobile()
  // const { emails } = useParticipantEmails(eventId)
  // const { enqueueSnackbar } = useSnackbar()

  // const copyEmails = () => {
  //   const emailsString = emails?.join(', ')
  //   if (emailsString) {
  //     copyToClipboard(emailsString)
  //     enqueueSnackbar('Copied all participant emails', {
  //       variant: 'success',
  //     })
  //   }
  // }

  return (
    <Container>
      <PageContainer isMobileOnly>
        <Section>
          <div>
            <Text color={theme.text.muted}>Event dashboard</Text>
            <Text variant='h4' fontWeight={700}>
              {event?.title}
            </Text>
          </div>
          <Link to={`/event/${event?._id}`} target='_blank' rel='noopener noreferrer'>
            <Button startIcon={<OpenInNewOutlinedIcon />}>View event</Button>
          </Link>
        </Section>
        <Section>
          <FlexContainer alignCenter justifySpaceBetween>
            <Text variant='h4' fontWeight={700}>
              Participants
            </Text>
            {/* <Button
              variant='text'
              size='small'
              startIcon={<ContentCopyIcon />}
              onClick={copyEmails}>
              Copy emails
            </Button> */}
          </FlexContainer>
          <ParticipantList eventId={eventId} />
        </Section>
        <Section>
          <Text variant='h4' fontWeight={700}>
            Seller's link
          </Text>
          <Text color={theme.text.light} variant={isMobile ? 'meta1' : 'p'}>
            Tickets purchased through the seller's link will attribute the ticket sale to the
            seller.
          </Text>
          <div>
            <SellersLinkForm eventId={eventId} />
          </div>
        </Section>
        {/* <Section>
          <Text variant='h4' fontWeight={700}>
            Sellers
          </Text>
          <SellerStats eventId={eventId} />
        </Section> */}
        <Section>
          <Text variant='h4' fontWeight={700}>
            Ticket sales
          </Text>
          <TicketSalesList eventId={eventId} ticketsTotalCount={event?.totalTicketCount} />
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
