import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import EventCard from 'src/components/events/eventCard'
import { IEvent, IEventDate } from 'src/types/event.type'

interface ISearchEventsProps {
  tagIDs: string[]
  searchData: IEvent[]
}

const SearchEvents = ({ tagIDs, searchData }: ISearchEventsProps) => {
  const [events, setEvents] = useState<IEvent[]>(searchData)
  useEffect(() => {
    if (tagIDs.length === 0) {
      setEvents(searchData)
    } else {
      const eventsWithTag =
        events !== undefined
          ? [...new Set(tagIDs.map((t) => events.filter((e) => e.tag.name === t)).flat())]
          : []
      setEvents(eventsWithTag)
    }
  }, [searchData, tagIDs.length])
  //   var d = searchData
  //   if (tagIDs.length === 1 || tagIDs.length === 2) {
  //     const filteredData = [
  //       ...new Set(tagIDs.map((t) => searchData.filter((e) => e.tag.name === t)).flat()),
  //     ]
  //     d = filteredData
  //   }

  return (
    <div>
      {events
        .map((e) =>
          e.dates.map((ed) => (
            <EventCard event={e} startTime={ed.startTime} endTime={ed.endTime} date={ed.date} />
          ))
        )
        .flat()}
    </div>
  )
}

export default SearchEvents
