import React from 'react'
import styled from 'styled-components'
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu'
import useDrag from 'src/hooks/useDrag'
import { IEvent } from 'src/types/event.type'
import TrendingEventCard from 'src/components/events/TrendingEventCard'
import useIsMobile from 'src/hooks/useIsMobile'
import { LeftArrow, RightArrow } from './Arrows'

interface ITrendingEventsProps {
  events?: IEvent[]
}

const TrendingEvents = ({ events }: ITrendingEventsProps) => {
  const { dragStart, dragStop, dragMove } = useDrag()
  const isMobile = useIsMobile()

  const handleDrag =
    ({ scrollContainer }: React.ContextType<typeof VisibilityContext>) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (isMobile && scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff
        }
      })

  if (!events) return null

  return (
    <Container onMouseLeave={dragStop}>
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}>
        {events?.map((e) => (
          <TrendingEventCard
            key={e?._id}
            itemId={e?._id}
            event={e}
            date={e.dates[0].date}
            time={e.dates[0].startTime}
          />
        ))}
      </ScrollMenu>
    </Container>
  )
}

const Container = styled.div`
  & .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
    display: none;
  }
`

export default TrendingEvents
