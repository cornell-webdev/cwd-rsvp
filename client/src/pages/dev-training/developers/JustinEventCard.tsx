import React from 'react'
import { IEvent } from 'src/types/event.type'
import styled from 'styled-components'

interface IJustinEventCardProps {
  event: IEvent
}

const JustinEventCard = ({ event }: IJustinEventCardProps) => {
  const title = event.title
  const views = event.views
  const img = event.imgs

  return (
    <Container>
      <p>Title: {title}</p>
      <p>Views: {views}</p>
      <img src={img[0]}></img>
    </Container>
  )
}

const Container = styled.div``

export default JustinEventCard
