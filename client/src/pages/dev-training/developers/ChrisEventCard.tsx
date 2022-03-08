import React from 'react'
import { Text } from 'cornell-glue-ui'
import styled from 'styled-components'
import { IEvent } from 'src/types/event.type'

interface IChrisEventCardProps {
  event: IEvent
}

const ChrisEventCard = ({ event }: IChrisEventCardProps) => {
  return (
    <Container>
      <Text>{event?.title}</Text>
      <Text>{event?.views}</Text>
      <Img src={event?.imgs[0]} />
    </Container>
  )
}

const Container = styled.div``

const Img = styled.img`
  height: 100px;
  width: 200px;
  border-radius: 8px;
`

export default ChrisEventCard
