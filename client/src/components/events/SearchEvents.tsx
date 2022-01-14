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
      {events
        .map((e) =>
          e.dates.map((ed) => (
            <EventCard
              key={`${e?._id}${ed.date}${ed.startTime}${ed.endTime}`}
              event={e}
              startTime={ed.startTime}
              endTime={ed.endTime}
              date={ed.date}
            />
          ))
        )
        .flat()}
    </div>
  )
}

export default SearchEvents
