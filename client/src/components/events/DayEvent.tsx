import { Button, FlexContainer, Text } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { useEvents } from 'src/api/event'
import EventCard from 'src/components/events/EventCard'
import styled from 'styled-components'

interface IDayEventProps {
  date: Date
  tagId: string
}

const DayEvent = ({ date, tagId }: IDayEventProps) => {
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
            <EventCard key={e?._id} event={e} startTime={ed.startTime} endTime={ed.endTime} />
          ))
      )
      .flat()
    return eventByDate
  }
  if (!events || events?.length === 0) return null

  return (
    <div>
      <DateText>{date.getTime() === today.getTime() ? 'Today' : days[date.getDay()]}</DateText>
      {getEventByDate()}
      {events?.length > 2 ? (
        <ButtonContainer justifyEnd={true}>
          <ExpandButton
            background='#F9ECEC'
            color='#212121'
            onClick={() => {
              setExpand(!expand)
            }}>
            {expand ? 'Show less' : 'Show more'}
          </ExpandButton>
        </ButtonContainer>
      ) : null}
    </div>
  )
}

const DateText = styled(Text)`
  font-weight: 700;
  padding: 8px 6px;
  font-size: 16px;
`

const ButtonContainer = styled(FlexContainer)`
  padding: 10px 0px 6px 0px;
`

const ExpandButton = styled(Button)`
  width: 91px;
  height: 22px;
  font-size: 14px;
  padding: 3px 0px;
  float: right;
  display: flex;
  align-items: center;
  justify-content: center; ;
`

export default DayEvent
