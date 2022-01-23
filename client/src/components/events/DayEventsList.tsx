import { Button, FlexContainer, Text, theme } from 'cornell-glue-ui'
import React, { memo, useState } from 'react'
import { useEvents } from 'src/api/event'
import EventCard from 'src/components/events/EventCard'
import { getEventDate } from 'src/util/date'
import styled from 'styled-components'

interface IDayEventProps {
  date: Date
  tagId?: string
}

const DayEventsList = ({ date, tagId }: IDayEventProps) => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const [expand, setExpand] = useState(false)

  date?.setHours(0, 0, 0, 0)
  const today = new Date()
  today?.setHours(0, 0, 0, 0)

  const { events } = useEvents({ date, tagId })

  /* filter by multiple tags */
  // useEffect(() => {
  //   if (tagIDs.length === 0) {
  //     setData(events || [])
  //   } else {
  //     const eventsWithTag =
  //       events !== undefined
  //         ? [...new Set(tagIDs.map((t) => events.filter((e) => e.tag.name === t)).flat())]
  //         : []
  //     setData(eventsWithTag)
  //   }
  // }, [events, tagIDs.length])

  // const displayEvents = getEventByDate(d, Data, expand)
  const displayEvents = expand ? events : events?.slice(0, 2)

  function getEventByDate() {
    const eventByDate = displayEvents
      ?.map((e) =>
        e.dates
          .filter((ed) => new Date(ed.date).toDateString() === date.toDateString())
          .map((ed) => (
            <EventCard
              key={`${e?._id}${ed.date}${ed.startTime}${ed.endTime}`}
              event={e}
              startTime={ed.startTime}
              endTime={ed.endTime}
            />
          ))
      )
      .flat()
    return eventByDate
  }

  if (!events || events?.length === 0) return <div />

  return (
    <Container>
      <DateText>
        {date.getTime() === today.getTime() ? 'Today' : days[date.getDay()].slice(0, 3)},{' '}
        {getEventDate(date)}
      </DateText>
      {getEventByDate()}
      {events?.length > 2 ? (
        <ButtonContainer justifyEnd={true}>
          <Button
            variant='text'
            size='small'
            background={theme.grey[50]}
            hoverBackground={theme.grey[100]}
            color={theme.text.default}
            onClick={() => {
              setExpand(!expand)
            }}>
            {expand ? 'Show less' : 'Show more'}
          </Button>
        </ButtonContainer>
      ) : null}
    </Container>
  )
}

const Container = styled.div`
  margin: 1.5rem 0;
`

const DateText = styled(Text)`
  font-weight: 700;
  padding-left: 0.375rem;
  font-size: 16px;
`

const ButtonContainer = styled(FlexContainer)`
  padding: 10px 0px 6px 0px;
`

export default memo(DayEventsList)
