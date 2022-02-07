import { FlexContainer, Text } from 'cornell-glue-ui'
import React from 'react'
import { Link } from 'react-router-dom'
import { IEvent } from 'src/types/event.type'
import { getEventDate, getEventTime } from 'src/util/date'
import getEventThumbnail from 'src/util/getEventThumbnail'
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
    <Link to={`/event/${event?._id}`}>
      <TrendingEventContainer className='trendingEvent'>
        <Thumbnail src={getEventThumbnail(event)} />
        <TextContainer>
          <Text fontWeight='700' variant='meta1' color='#9E9E9E'>
            {getEventTime(time) + ', ' + getEventDate(date)}
          </Text>
          <TitleRow justifySpaceBetween={true} alignCenter={true}>
            <Text fontWeight='700' variant='meta1' color='#212121' maxLines={1}>
              {event?.title}
            </Text>
            <LikeButton event={event} />
          </TitleRow>
        </TextContainer>
      </TrendingEventContainer>
    </Link>
  )
}

const TrendingEventContainer = styled.div`
  border-radius: 6px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin: 0.5rem;
  border: 1px solid ${(props) => props.theme.border.default};
  padding-bottom: 0.5rem;
`

const TextContainer = styled.div`
  padding: 0.625rem 0.75rem 0 0.75rem;
`

const TitleRow = styled(FlexContainer)`
  margin-top: -0.3rem;
`

const Thumbnail = styled.img`
  border-radius: 6px 6px 0px 0px;
  width: 200px;
  object-fit: cover;
  height: 100px;
  border-bottom: 2px solid ${(props) => props.theme.border.light};
`

export default TrendingEventCard
