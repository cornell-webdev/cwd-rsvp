import React from 'react'
import styled from 'styled-components'
import { Text, Tag } from 'cornell-glue-ui'
import LikeButton from './likeButton'
import { FlexContainer } from 'cornell-glue-ui'
import { IEvent, IEventDate } from 'src/types/event.type'
import { IUser } from 'src/types/user.type'
import { getDate } from './trendingEvent'

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

  var desc = event.title

  if (event.title.length > 32) {
    desc = event.title.substring(0, 32) + '...'
  }

  return (
    <EventContainer className='event' alignCenter={true}>
      <ImgContainer className='img' src={event.imgs[0]} />
      <TextContainer className='text'>
        <Text variant='meta2'>{event.org.name}</Text>
        <Text fontWeight='700' variant='meta1'>
          {desc}
        </Text>
        <Tag variant='contained' color={event.tag.color} background={event.tag.backgroundColor}>
          {event.tag.name.charAt(0).toUpperCase() + event.tag.name.slice(1)}
        </Tag>
        <FlexContainer justifySpaceBetween={true} alignCenter={true}>
          {date !== undefined ? (
            <Text variant='meta2' color='#d05f5f' fontWeight='700'>
              {getTime(startTime)} - {getTime(endTime)}, {getDate(date)}
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
  height: 100px;
  padding: 4px 6px;
`

const ImgContainer = styled.img`
  float: left;
  border-radius: 6px;
  width: 87px;
  height: 87px;
  margin-right: 10px;
`

const TextContainer = styled.div`
  width: 270px;
  height: 87px;
`

export default EventCard
