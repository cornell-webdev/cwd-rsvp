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

  const range = false

  const rangeEvents = (startDate: Date, endDate: Date) => {
    const curr: Date = startDate

    return <div>{}</div>
  }

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
