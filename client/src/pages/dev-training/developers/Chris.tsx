import { Text } from 'cornell-glue-ui'
import React from 'react'
import styled from 'styled-components'
import { useEvents } from 'src/api/event'
import ChrisEventCard from './ChrisEventCard'

interface IChrisProps {}

const Chris = ({}: IChrisProps) => {
  const { events } = useEvents({
    date: new Date(),
  })

  console.log(events)

  return (
    <Container>
      <Text>Hi my name is Chris</Text>
      {events?.map((event) => (
        <ChrisEventCard key={event._id} event={event} />
      ))}
    </Container>
  )
}

const Container = styled.div``

export default Chris
