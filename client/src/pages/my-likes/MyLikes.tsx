import { Spacer, Text } from 'cornell-glue-ui'
import React from 'react'
import { useLikedEvents } from 'src/api/event'
import EventCard from 'src/components/events/EventCard'
import PageContainer from 'src/components/layout/PageContainer'
import styled from 'styled-components'
import DayList from '../home/DayList'

const MyLikes = () => {
  const { likedEvents } = useLikedEvents()

  return (
    <PageContainer isMobileOnly isShowWarning={false}>
      <Container>
        <MatchDayListPadding>
          <Text variant='h4' fontWeight={700}>
            My likes
          </Text>
        </MatchDayListPadding>
        <Spacer y={0.75} />
        {likedEvents?.map((event) => (
          <EventCard
            key={event?._id}
            event={event}
            startTime={event?.dates[0]?.startTime}
            endTime={event?.dates[0]?.endTime}
          />
        ))}
        <Spacer y={2} />
        <MatchDayListPadding>
          <Text variant='h4' fontWeight={700}>
            More events
          </Text>
        </MatchDayListPadding>
        <DayList />
      </Container>
    </PageContainer>
  )
}

const Container = styled.div``

const MatchDayListPadding = styled.div`
  padding-left: 0.375rem;
`

export default MyLikes
