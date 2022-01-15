import React from 'react'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'

const EventDetails = () => {
  const router = useRouter()
  const eventId = router.match.params.eventId

  return <Container>{eventId}</Container>
}

const Container = styled.div``

export default EventDetails
