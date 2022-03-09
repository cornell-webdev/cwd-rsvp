import React from 'react'
import styled from 'styled-components'
import { Text } from 'cornell-glue-ui'
import { useEvents } from 'src/api/event'
import JustinEventCard from './JustinEventCard'

const Justin = () => {
  const { events, refetch } = useEvents({
    date: new Date(),
  })

  console.log('events', events)

  return (
    <Container>
      <Text>Hello my name is Justin!</Text>
      {events?.map((event) => (
        <JustinEventCard event={event} key={event?._id} refetch={refetch}></JustinEventCard>
      ))}
    </Container>
  )
}

const Container = styled.div``

export default Justin
