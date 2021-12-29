import { Text } from 'cornell-glue-ui'
import React from 'react'
import { useMyEvents } from 'src/api/event'
import styled from 'styled-components'

interface IMyEventsProps {}

const MyEvents = ({}: IMyEventsProps) => {
  const { myEvents } = useMyEvents()

  return (
    <Container>
      <Text variant='h4' fontWeight={700}>
        My events
      </Text>
      {myEvents?.map((event) => (
        <Text key={event?._id}>{event?.title}</Text>
      ))}
    </Container>
  )
}

const Container = styled.div`
  padding: 0.75rem;
`

export default MyEvents
