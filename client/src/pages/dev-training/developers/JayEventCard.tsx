import { Text } from 'cornell-glue-ui'
import React from 'react'
import { IEvent } from 'src/types/event.type'
import styled from 'styled-components'

interface IJayEventCardProps {
  event: IEvent
}

const JayEventCard = ({ event }: IJayEventCardProps) => {
  return (
    <Container>
      {/* <img src={event?.imgs[0]} /> */}
      <StyledImg src={event?.imgs[0]} />
      <Text>{event?.title}</Text>
      <Text>{event?.views}</Text>
    </Container>
  )
}

const Container = styled.div``

const StyledImg = styled.img`
  height: 100px;
  width: 200px;
  border-radius: 8px;
`

export default JayEventCard
