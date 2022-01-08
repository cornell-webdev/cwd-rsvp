import { Spacer, Text } from 'cornell-glue-ui'
import React from 'react'
import EventForm from 'src/components/forms/EventForm'
import styled from 'styled-components'

const NewEvent = () => {
  return (
    <Container>
      <Text variant='h4' fontWeight={700}>
        Create event
      </Text>
      <Spacer y='1.125rem' />
      <EventForm />
    </Container>
  )
}

const Container = styled.div`
  padding: 0.75rem;
`

export default NewEvent
