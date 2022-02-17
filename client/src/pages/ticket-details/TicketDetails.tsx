import React from 'react'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'
import QRCode from 'react-qr-code'

const TicketDetails = () => {
  const router = useRouter()
  const ticketId = router.match.params.ticketId

  return (
    <Container>
      <QRCode value={`https://cornellrsvp.com/check-in/${ticketId}`} />
    </Container>
  )
}

const Container = styled.div`
  padding: 2rem;
`

export default TicketDetails
