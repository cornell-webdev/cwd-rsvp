import React, { memo, useState } from 'react'
import useInfiniteScroll from 'react-infinite-scroll-hook'
import DayEventsList from 'src/components/events/DayEventsList'

interface IEventsByDayProps {
  tagId?: string
}

const DayList = ({ tagId }: IEventsByDayProps) => {
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

  return (
    <div>
      {arr.map((_, i) => {
        const day: Date = new Date()
        day.setDate(new Date().getDate() + i)
        return (
          <div key={day.toString()}>
            <DayEventsList date={day} tagId={tagId} />
          </div>
        )
      })}
      <div ref={sentryRef} />
    </div>
  )
}

export default memo(DayList)
