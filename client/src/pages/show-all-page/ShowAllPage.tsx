import React from 'react'
import styled from 'styled-components'
import { Button, FlexContainer, Text } from 'cornell-glue-ui'
import { getEventDate } from 'src/util/date'
import EventCard from 'src/components/events/EventCard'
import useRouter from 'src/hooks/useRouter'
import { useEvents } from 'src/api/event'
import PageContainer from 'src/components/layout/PageContainer'
import BackButton from 'src/components/BackButton'
import { Link, useHistory } from 'react-router-dom'

const ShowAllPage = () => {
  const today = new Date()
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const history = useHistory()

  const router = useRouter()
  const tagId = router.query?.tagId
  const date = new Date(router.match.params.date)

  const { events } = useEvents({ date, tagId })

  return (
    <PageContainer isMobileOnly isShowWarning={false} isNoPadding>
      <Container>
        {/* <Button onClick={history.goBack}>Back</Button> */}
        <StyledLink to='/'>
          <BackButton></BackButton>
        </StyledLink>

        <DateText>
          {date.getTime() === today.getTime() ? 'Today' : days[date.getDay()].slice(0, 3)},{' '}
          {getEventDate(date)}
        </DateText>

        {events?.map((e) =>
          e.dates
            .filter((ed) => new Date(ed.date).toDateString() === date.toDateString())
            .map((ed) => (
              <EventCard
                key={`${e?._id}${ed.date}${ed.startTime}${ed.endTime}`}
                event={e}
                startTime={ed.startTime}
                endTime={ed.endTime}
              />
            ))
        )}
      </Container>
    </PageContainer>
  )
}

const StyledLink = styled(Link)`
  margin: 0.25rem 0;
  width: 100%;
`

const Container = styled.div`
  margin: 1.5rem 0;
`

const DateText = styled(Text)`
  font-weight: 700;
  padding-left: 0.375rem;
  font-size: 16px;
`

const ButtonContainer = styled(FlexContainer)`
  padding: 10px 0px 6px 0px;
`

export default ShowAllPage
