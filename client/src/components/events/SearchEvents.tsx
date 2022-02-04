import React from 'react'
import EventCard from 'src/components/events/EventCard'
import { IEvent } from 'src/types/event.type'

interface ISearchEventsProps {
  events?: IEvent[]
}

const SearchEvents = ({ events }: ISearchEventsProps) => {
  // const [events, setEvents] = useState<IEvent[]>(searchData)
  // useEffect(() => {
  //   if (tagIDs.length === 0) {
  //     setEvents(searchData)
  //   } else {
  //     const eventsWithTag =
  //       events !== undefined
  //         ? [...new Set(tagIDs.map((t) => events.filter((e) => e.tag.name === t)).flat())]
  //         : []
  //     setEvents(eventsWithTag)
  //   }
  // }, [searchData, tagIDs.length])
  //   var d = searchData
  //   if (tagIDs.length === 1 || tagIDs.length === 2) {
  //     const filteredData = [
  //       ...new Set(tagIDs.map((t) => searchData.filter((e) => e.tag.name === t)).flat()),
  //     ]
  //     d = filteredData
  //   }

  if (!events) return null

  return (
    <div>
      {events.map((event) => (
        <EventCard
          key={`${event?._id}${event.dates[0].date}${event.dates[0].startTime}${event.dates[0].endTime}`}
          event={event}
          startTime={event.dates[0].startTime}
          endTime={event.dates[0].endTime}
          date={new Date(event.dates[0].date)}
        />
      ))}
    </div>
  )
}

export default SearchEvents
