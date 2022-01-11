import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// TODO: custom history definition
// import history from 'src/util/history'
import EventCard from 'src/components/events/eventCard'
import TrendingEvent from 'src/components/events/trendingEvent'
import SearchBox from 'src/components/events/searchBox'
import FilterButton from 'src/components/events/FilterButton'
import DayEvent from 'src/components/events/DayEvent'

import eve from './eve'
import { FlexContainer, Text, Tag, Button } from 'cornell-glue-ui'
import { IEvent, IEventDate } from 'src/types/event.type'
import { useTrendingEvents } from 'src/api/event'
import { useSearchedEvents } from '../../api/event'

function Home() {
  const [filteredData, setFilteredData] = useState<IEvent[]>([])
  const [Data, setData] = useState<IEvent[]>(eve)
  const [searchData, setSearchData] = useState<IEvent[]>([])
  const [TrendingData, setTrendingData] = useState<IEvent[]>([])
  const [search, setSearch] = useState(false)
  const [numPressed, setnumPressed] = useState(0)
  const [wordEntered, setWordEntered] = useState('')

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
    // setFilteredData(data);
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
  // console.log('searchevent', searchedEvents)
  // console.log('search', searchData)
  // console.log('isSearch', search)
  // console.log('w', wordEntered)

  const { trendingEvents } = useTrendingEvents()
  // console.log('trending', trendingEvents)
  useEffect(() => {
    setTrendingData(trendingEvents || [])
  }, [TrendingData])

  function filter1(tag: string) {
    if (!search) {
      setFilteredData([...new Set([...Data.filter((e) => e.tag.name === tag), ...filteredData])])
      setnumPressed(numPressed + 1)
    } else if (numPressed !== 2) {
      setFilteredData([
        ...new Set([...searchData.filter((e) => e.tag.name === tag), ...filteredData]),
      ])
      setnumPressed(numPressed + 1)
    } else {
      setFilteredData(searchData)
      setnumPressed(numPressed + 1)
    }
  }

  function filter2(tag: string) {
    setFilteredData(filteredData.filter((e) => e.tag.name !== tag))
    setnumPressed(numPressed - 1)
  }

  function getSearchData() {
    const d = numPressed === 0 || numPressed === 3 ? searchData : filteredData
    return searchData.map((e) =>
      e.dates.map((ed) => (
        <EventCard event={e} startTime={ed.startTime} endTime={ed.endTime} date={ed.date} />
      ))
    )
  }

  const today = new Date()
  const days = [0, 1, 2, 3, 4]
  const tags = ['Entertainment', 'Professional', 'Sport']
  const tagColors = ['#E8AC15', '#71B6BA', '#8F9ACF']
  const tagBackground = ['#FEF3D6', '#E9F5F5', '#E3E8F4']

  return (
    <Container>
      <EventText>Trending</EventText>
      <ScrollContainer>
        <TrendingContainer>
          {TrendingData.map((e) => (
            <TrendingEvent event={e} date={e.dates[0].date} time={e.dates[0].startTime} />
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
        {tags.map((t, i) => (
          <FilterButton
            tag={t}
            color={tagColors[i]}
            backgroundColor={tagBackground[i]}
            functionPress={filter1}
            functionUnpress={filter2}
          />
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
              return <DayEvent d={day} tagIDs={[]} />
            })}
          </div>
        ) : (
          days.map((d) => {
            const day: Date = new Date()
            day.setDate(today.getDate() + d)
            return <DayEvent d={day} tagIDs={[]} />
          })
        )
      ) : (
        <div>{getSearchData()}</div>
      )}
    </Container>
  )
}

const Container = styled.div`
  padding: 6px;
`

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
