import React from 'react'
import { Text, Tag, Spacer} from 'cornell-glue-ui'
import LikeContainer from './like'
import { FlexContainer } from 'cornell-glue-ui'
import { IEvent, IEventDate } from 'src/types/event.type'
import { IUser } from 'src/types/user.type'
import './event.css'



interface EventProps {
  event: IEvent, 
  startTime: string
  endTime: string
}

const Event: React.FC<EventProps> = ({event, startTime, endTime}) => {

  function getTime (time: string) {
    const hour = parseInt(time.substring(0,2))
    if(hour < 12){
      return hour.toString() + ':' + time.substring(2, 4) + ' am'
    }else if (hour > 12){
      return (hour-12).toString() + ':' + time.substring(2,4) + ' pm'

    }else {
      return time + ' pm'
    }

  }

  var desc = event.title
  
    if (event.title.length > 32){
      desc = event.title.substring(0, 32) + '...'
    }

  return (
    <FlexContainer className='event' alignCenter={true}>
      <img className='img' src={event.imgs[0]}/>
      <div className='text'>
        <Text variant='meta2'>{event.org.name}</Text>
        <Text fontWeight='700' variant='meta1'>{desc}</Text>
        <Tag variant="contained" color={event.tag.color} background={event.tag.backgroundColor}>{event.tag.name}</Tag>
        <FlexContainer justifySpaceBetween={true} alignCenter={true}>
          <Text variant='meta2' color='#d05f5f' fontWeight='700'>{getTime(startTime)} - {getTime(endTime)}</Text>
          <LikeContainer event={event}/>
        </FlexContainer>
      </div>

    </FlexContainer>

  )
}

export default Event