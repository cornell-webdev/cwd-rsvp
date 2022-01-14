import { FlexContainer, Text } from 'cornell-glue-ui'
import React from 'react'
import { IEvent } from 'src/types/event.type'
import { getEventDate } from 'src/util/date'
import styled from 'styled-components'
import LikeButton from './LikeButton'

interface ITrendingEventProps {
  event: IEvent
  itemId: string
  date: Date
  time: string
}

const TrendingEventCard: React.FC<ITrendingEventProps> = ({
  event,
  date,
  time,
}: ITrendingEventProps) => {
  return (
    <TrendingEventContainer className='trendingEvent'>
      <ImgContainer src={event.imgs[0]} />
      <div>
        <Container>
          <Text fontWeight='700' variant='meta1' color='#9E9E9E'>
            {getTime(time) + ', ' + getEventDate(date)}
          </Text>
        </Container>
        <Container justifySpaceBetween={true} alignCenter={true}>
          <Text fontWeight='700' variant='meta1' color='#212121' maxLines={1}>
            {event?.title}
          </Text>
          <LikeButton event={event} />
        </Container>
      </div>
    </TrendingEventContainer>
  )
}

function getTime(time: string) {
  const hour = parseInt(time.substring(0, 2))
  if (hour < 12) {
    return hour.toString() + ':' + time.substring(2, 4) + ' am'
  } else if (hour > 12) {
    return (hour - 12).toString() + ':' + time.substring(2, 4) + ' pm'
  } else {
    return hour.toString() + ':' + time.substring(2, 4) + ' pm'
  }
}

const TrendingEventContainer = styled.div`
  width: 200px;
  height: 150px;
  border-radius: 6px;
  margin-inline: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0.5rem;
  border: 1px solid ${(props) => props.theme.border.default};
`

const Container = styled(FlexContainer)`
  margin: 0.5px 12px;
`

const ImgContainer = styled.img`
  border-radius: 6px 6px 0px 0px;
  width: 200px;
  height: 90px;
`

export default TrendingEventCard
