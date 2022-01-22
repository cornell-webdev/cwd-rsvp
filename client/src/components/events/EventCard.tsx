import { FlexContainer, Tag, Text } from 'cornell-glue-ui'
import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import { IEvent } from 'src/types/event.type'
import { getEventDate, getEventTime } from 'src/util/date'
import { capitalizeFirstChar } from 'src/util/string'
import styled from 'styled-components'
import LikeButton from './LikeButton'

interface IEventProps {
  event: IEvent
  startTime: string
  endTime: string
  date?: Date
}

const EventCard: React.FC<IEventProps> = ({ event, startTime, endTime, date }: IEventProps) => {
  return (
    <StyledLink to={`/event/${event?._id}`} onClick={() => console.log('clicked card')}>
      <EventContainer alignStart>
        <ImgContainer src={event.imgs[0]} />
        <TextContainer>
          <Text variant='meta2' maxLines={1}>
            {event.org.name}
          </Text>
          <Text fontWeight='700' variant='meta1' maxLines={2}>
            {event.title}
          </Text>
          {event?.tag && (
            <TagContainer>
              <Tag
                variant='contained'
                color={event.tag?.color}
                background={event.tag?.backgroundColor}>
                {capitalizeFirstChar(event?.tag?.name)}
              </Tag>
            </TagContainer>
          )}
          <FlexContainer justifySpaceBetween alignCenter>
            {date !== undefined ? (
              <Text variant='meta2' color='#d05f5f' fontWeight='700'>
                {getEventTime(startTime)} - {getEventTime(endTime)}, {getEventDate(date)}
              </Text>
            ) : (
              <Text variant='meta2' color='#d05f5f' fontWeight='700'>
                {getEventTime(startTime)} - {getEventTime(endTime)}
              </Text>
            )}
            <LikeButtonContainer onClick={() => console.log('clicked like button container')}>
              <LikeButton event={event} />
            </LikeButtonContainer>
          </FlexContainer>
        </TextContainer>
      </EventContainer>
    </StyledLink>
  )
}

const StyledLink = styled(Link)`
  margin: 0.25rem 0;
  width: 100%;
`

const EventContainer = styled(FlexContainer)`
  position: relative;
  padding: 0.5rem 0.375rem;
  cursor: pointer;
  border-radius: 8px;

  @media (min-width: ${(props) => props.theme.small}) {
    &:hover {
      background: ${(props) => props.theme.grey[50]};
    }
  }
`

const ImgContainer = styled.img`
  float: left;
  border-radius: 6px;
  min-width: 87px;
  width: 35%;
  margin-right: 10px;
  object-fit: contain;
  border: 1px solid ${(props) => props.theme.border.default};
  height: 87px;

  @media (min-width: ${(props) => props.theme.small}) {
    height: 120px;
  }
`

const TagContainer = styled.div`
  margin: 0.3rem 0;
`

const TextContainer = styled.div`
  width: 70%;
`

const LikeButtonContainer = styled.div`
  position: absolute;
  right: 5px;
  bottom: 8px;
`

export default memo(EventCard)
