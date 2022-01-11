import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FlexContainer, Text, Tag, Button } from 'cornell-glue-ui'
import EventCard from 'src/components/events/eventCard'
import { IEvent, IEventDate } from 'src/types/event.type'
import { useEvents, IUseEvents } from 'src/api/event'

interface IDayEventProps {
  d: Date
  tagIDs: string[]
}

const DayEvent = ({ d, tagIDs }: IDayEventProps) => {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const [expand, setExpand] = useState(false)
  const [Data, setData] = useState<IEvent[]>([])

  d.setHours(0, 0, 0, 0)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const { events } = useEvents({ date: d })
  useEffect(() => {
    if (tagIDs.length === 0) {
      setData(events || [])
    } else {
      const eventsWithTag =
        events !== undefined
          ? [...new Set(tagIDs.map((t) => events.filter((e) => e.tag.name === t)).flat())]
          : []
      setData(eventsWithTag)
    }
  }, [events, tagIDs.length])

  function getEventByDate(date: Date, data: IEvent[], expand: boolean) {
    const eventByDate = data
      .map((e) =>
        e.dates
          .filter((ed) => new Date(ed.date).toDateString() === date.toDateString())
          .map((ed) => <EventCard event={e} startTime={ed.startTime} endTime={ed.endTime} />)
      )
      .flat()
    return eventByDate
  }

  const displayEvents = getEventByDate(d, Data, expand)

  return (
    <div>
      <DateText>{d.getTime() === today.getTime() ? 'Today' : days[d.getDay()]}</DateText>
      {expand ? displayEvents : displayEvents.slice(0, 2)}
      {displayEvents.length > 2 ? (
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