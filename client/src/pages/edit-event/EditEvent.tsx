import { Spacer, Text } from 'cornell-glue-ui'
import React from 'react'
import EventForm from 'src/components/forms/EventForm'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'

const EditEvent = () => {
  const router = useRouter()
  const eventId = router.match.params.eventId
  // TODO: fetch existing event data by id

  return (
    <Container>
      <Text variant='h4' fontWeight={700}>
        Edit event
      </Text>
      <Spacer y='1.125rem' />
      <EventForm />
    </Container>
  )
}

const Container = styled.div`
  padding: 0.75rem;
`

export default EditEvent
