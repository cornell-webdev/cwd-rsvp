import { FlexContainer, Text } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { useTrendingEvents } from 'src/api/event'
import { useAllTags } from 'src/api/tag'
import FilterButton from 'src/components/events/FilterButton'
import SearchBox from 'src/components/events/SearchBox'
import SearchEvents from 'src/components/events/SearchEvents'
import PageContainer from 'src/components/layout/PageContainer'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'
import { useSearchedEvents } from '../../api/event'
import DayList from './DayList'
import TrendingEvents from './TrendingEvents'

function Home() {
  const [tagId, setTagId] = useState<string>()
  const router = useRouter()
  const query = router.query?.query
  const { searchedEvents } = useSearchedEvents(query)
  const { trendingEvents } = useTrendingEvents()
  const { tags } = useAllTags()

  const toggleTag = (targetTagId: string) => {
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

  return (
    <PageContainer isMobileOnly isShowWarning={false}>
      <EventText>Trending</EventText>
      <TrendingEvents events={trendingEvents} />
      <SearchBox />
      {!query && (
        <FiltersContainer>
          {tags?.map((tag) => (
            <FilterButton key={tag?._id} selectedTagId={tagId} tag={tag} onClick={toggleTag} />
          ))}
        </FiltersContainer>
      )}
      <FlexContainer justifyCenter>
        <EventListContainer>
          {searchedEvents?.length === 0 ? (
            query && query !== '' ? (
              <div>
                <WarningText>
                  Sorry, we couldn’t find the event you are looking for. Please try a different
                  search term.
                </WarningText>
                <MoreText>More Events</MoreText>
                <DayList tagId={tagId} />
              </div>
            ) : (
              <DayList tagId={tagId} />
            )
          ) : (
            <SearchEvents events={searchedEvents} />
          )}
        </EventListContainer>
      </FlexContainer>
    </PageContainer>
  )
}

const EventText = styled(Text)`
  font-size: 22px;
  font-weight: 700;
  padding: 8px 6px;
`

const FiltersContainer = styled.div`
  white-space: nowrap;
  padding: 4px 0px 14px;
`

const EventListContainer = styled.div`
  width: 100%;
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
