import { Spacer, Text } from 'cornell-glue-ui'
import React from 'react'
import { useMyEvents } from 'src/api/event'
import styled from 'styled-components'
import MyEventCard from './MyEventCard'

const MyEvents = () => {
  const { myEvents } = useMyEvents()

  return (
    <Container>
      <Text variant='h4' fontWeight={700}>
        My events
      </Text>
      <Spacer y={1.5} />
      {myEvents?.map((event) => (
        <MyEventCard key={event?._id} event={event} />
      ))}
    </Container>
  )
}

const Container = styled.div`
  padding: 0.75rem;
`

export default MyEvents
