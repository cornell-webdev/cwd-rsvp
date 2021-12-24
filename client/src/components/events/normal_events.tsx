import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Text, Tag } from 'cornell-glue-ui'
import LikeContainer from './like'
import { FlexContainer } from 'cornell-glue-ui'
import { IOrg } from 'src/types/org.type'
import { IEvent, IEventDate } from 'src/types/event.type'
import { IUser } from 'src/types/user.type'
import { ITag } from 'src/types/tag.type'
import './event.css'



interface EventProps {
  event: IEvent, 
  date: Date
}

const Event: React.FC<EventProps> = ({event, date}) => {

  return (
    <FlexContainer className='event'>
      <img className='img' src={event.imgs[0]}/>
      <div className='text'>
        <Text variant='meta1'>{event.org.name}</Text>
        <Text fontWeight='700' variant='p'>{event.title}</Text>
        <Tag variant="contained" color={event.tag.color} background={event.tag.backgroundColor}>{event.tag.name}</Tag>
        <FlexContainer justifySpaceBetween={true}>
          {/* {event.dates.filter(e => e.date.getTime() === date.getTime()).map(e => <Text>{e.startTime} - {e.endTime}</Text>)} */}
          <Text className='date' variant='meta1' color='#d05f5f' fontWeight='700'>{event.dates[0].startTime} - {event.dates[0].endTime}</Text>
          <LikeContainer event={event}/>
        </FlexContainer>
      </div>

    </FlexContainer>

  )
}

export default Event