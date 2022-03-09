import { Text } from 'cornell-glue-ui'
import JayEventCard from './JayEventCard'
import React from 'react'
import { useEvents } from 'src/api/event'
import styled from 'styled-components'

const Jay = () => {
  const { events, refetch } = useEvents({
    date: new Date(),
  })

  return (
    <Container>
      <Text>Hi my name is Jay</Text>
      {events?.map((event) => (
        <JayEventCard key={event?._id} event={event} refetch={refetch} />
      ))}
    </Container>
  )
}

const Container = styled.div``

export default Jay
