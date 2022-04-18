import { listenerCount } from 'process'
import React, { memo, useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import DayEventsList from 'src/components/events/DayEventsList'

interface IEventsByDayProps {
  startDate?: Date
  endDate?: Date
  tagId?: string
}

const DayList = ({ startDate, endDate, tagId }: IEventsByDayProps) => {
  const MAX_LENGTH = 50
  const [arr, setArr] = useState<any[]>(Array.from({ length: 10 }))

  const loadMore = () => {
    if (arr.length < MAX_LENGTH) {
      const newArr = arr.concat(Array.from({ length: 10 }))
      setArr(newArr)
    }
  }

  const [sentryRef] = useInfiniteScroll({
    loading: false,
    hasNextPage: true,
    onLoadMore: loadMore,
    disabled: false,
  })

  let range = false

  // right now, the date range picker works as long as they select more than 1 day
  if (startDate && endDate) {
    range = startDate < endDate
  }

  // console.log(startDate)
  // console.log(endDate)

  const rangeEvents = (startDate: Date, endDate: Date) => {
    let curr = new Date(startDate)
    curr.setDate(curr.getDate() - 1)
    const dates = []

    // for some reason, the dates that are displayed is one more than the startDate and endDate
    while (curr < endDate) {
      dates.push(curr)

      const newDate = curr.setDate(curr.getDate() + 1)
      curr = new Date(newDate)
    }

    const datesList = dates.map((date) => (
      <div key={date.toString()}>
        <DayEventsList date={date} tagId={tagId} />
      </div>
    ))

    return <div>{datesList}</div>
  }

  console.log(startDate)
  console.log(endDate)

  return (
    <div>
      {!range
        ? arr.map((_, i) => {
            const day: Date = new Date()
            day.setDate(new Date().getDate() + i)
            return (
              <div key={day.toString()}>
                <DayEventsList date={day} tagId={tagId} />
              </div>
            )
          })
        : rangeEvents(startDate as Date, endDate as Date)}
      <div ref={sentryRef} />
    </div>
  )
}

export default memo(DayList)
