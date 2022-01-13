import { FlexContainer, Text } from 'cornell-glue-ui'
import React, { useEffect, useState } from 'react'
import { useTrendingEvents } from 'src/api/event'
import { useAllTags } from 'src/api/tag'
import DayEvent from 'src/components/events/DayEvent'
import FilterButton from 'src/components/events/FilterButton'
import SearchBox from 'src/components/events/searchBox'
import SearchEvents from 'src/components/events/SearchEvents'
import TrendingEvent from 'src/components/events/trendingEvent'
import PageContainer from 'src/components/layout/PageContainer'
import { IEvent } from 'src/types/event.type'
import styled from 'styled-components'
import { useSearchedEvents } from '../../api/event'

function Home() {
  const [searchData, setSearchData] = useState<IEvent[]>([])
  const [search, setSearch] = useState(false)
  const [wordEntered, setWordEntered] = useState('')
  const [tagId, setTagId] = useState<string>()

  const handleFilter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSearch(true)
    }
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value
    setWordEntered(searchWord)
  }

  const clearInput = () => {
    setWordEntered('')
    setSearch(false)
  }

  const { searchedEvents } = useSearchedEvents(wordEntered)
  useEffect(() => {
    if (search) {
      setSearchData(searchedEvents || [])
    } else {
      setSearchData([])
    }
  }, [search])

  const { trendingEvents } = useTrendingEvents()

  function toggleTag(targetTagId: string) {
    if (tagId === targetTagId) {
      setTagId(undefined)
    } else {
      setTagId(targetTagId)
    }
  }

  // function getSearchData() {
  //   // const filteredData = [
  //   //   ...new Set(tagIDs.map((t) => searchData.filter((e) => e.tag.name === t)).flat()),
  //   // ]
  //   // const d = tagIDs.length === 0 || tagIDs.length === 3 ? searchData : filteredData
  //   return searchData.map((e) =>
  //     e.dates.map((ed) => (
  //       <EventCard event={e} startTime={ed.startTime} endTime={ed.endTime} date={ed.date} />
  //     ))
  //   )
  // }

  const today = new Date()
  const days = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const { tags } = useAllTags()

  return (
    <PageContainer isMobileOnly>
      <EventText>Trending</EventText>
      <ScrollContainer>
        <TrendingContainer>
          {trendingEvents?.map((e) => (
            <TrendingEvent
              key={e?._id}
              event={e}
              date={e.dates[0].date}
              time={e.dates[0].startTime}
            />
          ))}
        </TrendingContainer>
      </ScrollContainer>
      <SearchContainer justifyCenter={true}>
        <SearchBox
          placeholder='input'
          handleFilter={handleFilter}
          handleSearch={handleSearch}
          clearInput={clearInput}
          wordEntered={wordEntered}
        />
      </SearchContainer>
      <TrendingContainer>
        {tags?.map((tag) => (
          <FilterButton key={tag?._id} selectedTagId={tagId} tag={tag} onClick={toggleTag} />
        ))}
      </TrendingContainer>
      {searchData.length === 0 ? (
        search ? (
          <div>
            <WarningText>
              Sorry, we couldn’t find the event you are looking for. Please try a different search
              term.
            </WarningText>
            <MoreText>More Events</MoreText>
            {days.map((d) => {
              const day: Date = new Date()
              day.setDate(today.getDate() + d)
              return <DayEvent key={day.toString()} date={day} tagId={tagId} />
            })}
          </div>
        ) : (
          days.map((d) => {
            const day: Date = new Date()
            day.setDate(today.getDate() + d)
            return <DayEvent key={day.toString()} date={day} tagId={tagId} />
          })
        )
      ) : (
        // <div>{getSearchData()}</div>
        <SearchEvents tagIDs={tagId} searchData={searchData} />
      )}
    </PageContainer>
  )
}

const EventText = styled(Text)`
  font-size: 22px;
  font-weight: 700;
  padding: 8px 6px;
`

const SearchContainer = styled(FlexContainer)`
  padding: 6px 12px 6px;
`

const TrendingContainer = styled(FlexContainer)`
  padding: 4px 0px 14px;
  overflow-x: scroll;
  white-space: nowrap;
`

const ScrollContainer = styled.div`
  overflow: hidden;
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
`

const WarningText = styled(Text)`
  color: #d05f5f;
  font-size: 14px;
  font-weight: 400;
  padding: 6px;
`

const MoreText = styled(EventText)`
  padding: 8px 6px 4px;
`

export default Home
