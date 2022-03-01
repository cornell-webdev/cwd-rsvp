import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import { Button, Spacer, Text, theme } from 'cornell-glue-ui'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTicketById, useCheckinTicket } from 'src/api/ticket'
import PageContainer from 'src/components/layout/PageContainer'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'

const CheckIn = () => {
  const router = useRouter()
  const ticketId = router.match.params.ticketId
  const { ticket } = useTicketById(ticketId)
  const { checkinTicketAsync } = useCheckinTicket()

  useEffect(() => {
    if (ticket) {
      checkinTicketAsync({ ticketId })
    }
  }, [ticket])

  if (!ticket) {
    return (
      <PageContainer isMobileOnly>
        <Text>Check-in failed.</Text>
        <Text>Invalid ticket.</Text>
      </PageContainer>
    )
  }

  return (
    <PageContainer isMobileOnly>
      <PageCenter>
        <Container>
          <Text variant='h4' fontWeight={700} color={theme.brand[500]}>
            Check-in complete!
          </Text>
          <Spacer y={2} />
          <StyledCheckCircleIcon />
          <Spacer y={2.5} />
          <Text variant='h4' fontWeight={700} textAlign='center'>
            {ticket?.event?.title}
          </Text>
          <Spacer y={1.5} />
          <Text>{ticket?.name}</Text>
          <Spacer y={2.5} />
          <Link to={`/dashboard/${ticket?.event?._id}`}>
            <Button>View dashboard</Button>
          </Link>
        </Container>
      </PageCenter>
    </PageContainer>
  )
}

const PageCenter = styled.div`
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 1rem;
`

const Container = styled.div`
  background: ${(props) => props.theme.brand[50]};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 60vh;
`

const StyledCheckCircleIcon = styled(CheckCircleIcon)`
  height: 98px;
  width: 98px;
  fill: ${(props) => props.theme.brand[500]};
`

export default CheckIn
