import React from 'react'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import TrendingEventCard from 'src/components/events/TrendingEventCard'
import { IEvent } from 'src/types/event.type'
import styled from 'styled-components'
import { LeftArrow, RightArrow } from './Arrows'

interface ITrendingEventsProps {
  events?: IEvent[]
}

const TrendingEvents = ({ events }: ITrendingEventsProps) => {
  if (!events) return null

  return (
    <Container>
      <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
        {events?.map((e) => (
          <TrendingEventCard
            key={e?._id}
            itemId={e?._id}
            event={e}
            date={new Date(e.dates[0].date)}
            time={e.dates[0].startTime}
          />
        ))}
      </ScrollMenu>
    </Container>
  )
}

const Container = styled.div`
  & .react-horizontal-scrolling-menu--scroll-container {
    overflow-x: auto;
  }
  & .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }
`

export default TrendingEvents
