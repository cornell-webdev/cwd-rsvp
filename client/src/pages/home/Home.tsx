import { Button, FlexContainer, Text, theme } from 'cornell-glue-ui'
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
import DateRangePicker, { IDates } from 'src/components/form-elements/DateRangePicker'
import FilterListIcon from '@mui/icons-material/FilterList'

function Home() {
  const [tagId, setTagId] = useState<string>()
  const router = useRouter()
  const query = router.query?.query
  const { searchedEvents } = useSearchedEvents(query)
  const { trendingEvents } = useTrendingEvents()
  const { tags } = useAllTags()
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(new Date())
  const [showRange, setShowRange] = useState<Boolean>(false)

  const setDates = (newDates: IDates) => {
    setStartDate(newDates?.startDate as Date)
    setEndDate(newDates?.endDate as Date)
  }

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

  // console.log(startDate)
  // console.log(endDate)

  return (
    <PageContainer isMobileOnly isShowWarning={false}>
      <EventText>Trending</EventText>
      <TrendingEvents events={trendingEvents} />
      <SearchBox placeholder='search event' />
      {!query && (
        <FiltersContainer>
          {tags?.map((tag) => (
            <FilterButton key={tag?._id} selectedTagId={tagId} tag={tag} onClick={toggleTag} />
          ))}
          <Button
            variant='text'
            size='small'
            endIcon={<FilterListIcon />}
            color={theme.text.default}
            background={theme.grey[50]}
            hoverBackground={theme.grey[100]}
            onClick={() => setShowRange(!showRange)}>
            Date
          </Button>
          {showRange ? (
            <DateRangePicker dates={{ startDate, endDate }} setDates={setDates}></DateRangePicker>
          ) : null}
        </FiltersContainer>
      )}

      {/* <FlexContainer justifyCenter>
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
              <DayList startDate={startDate} endDate={endDate} tagId={tagId} />
            )
          ) : (
            <SearchEvents events={searchedEvents} />
          )}
        </EventListContainer>
      </FlexContainer> */}

      <FlexContainer justifyCenter>
        <EventListContainer>
          <DayList startDate={startDate} endDate={endDate} tagId={tagId} />
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
