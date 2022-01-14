import { FlexContainer, Tag, Text } from 'cornell-glue-ui'
import React, { memo } from 'react'
import { IEvent } from 'src/types/event.type'
import { getEventDate } from 'src/util/date'
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
  function getTime(time: string) {
    const hour = parseInt(time.substring(0, 2))
    if (hour < 12) {
      return hour.toString() + ':' + time.substring(2, 4) + ' am'
    } else if (hour > 12) {
      return (hour - 12).toString() + ':' + time.substring(2, 4) + ' pm'
    } else {
      return time + ' pm'
    }
  }

  return (
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
              {getTime(startTime)} - {getTime(endTime)}, {getEventDate(date)}
            </Text>
          ) : (
            <Text variant='meta2' color='#d05f5f' fontWeight='700'>
              {getTime(startTime)} - {getTime(endTime)}
            </Text>
          )}
          <LikeButton event={event} />
        </FlexContainer>
      </TextContainer>
    </EventContainer>
  )
}

const EventContainer = styled(FlexContainer)`
  padding: 0.25rem 0.375rem;
  margin: 0.5rem 0;
`

const ImgContainer = styled.img`
  float: left;
  border-radius: 6px;
  min-width: 87px;
  width: 28%;
  min-height: 87px;
  height: 8vw;
  margin-right: 10px;
  object-fit: cover;
  border: 1px solid ${(props) => props.theme.border.default};
`

const TagContainer = styled.div`
  margin: 0.3rem 0;
`

const TextContainer = styled.div`
  width: 70%;
`

export default memo(EventCard)
