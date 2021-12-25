import React from 'react'
import { Text, Tag, Spacer} from 'cornell-glue-ui'
import LikeContainer from './like'
import { FlexContainer } from 'cornell-glue-ui'
import { IEvent, IEventDate } from 'src/types/event.type'
import { IUser } from 'src/types/user.type'
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
        <Text variant='meta2'>{event.org.name}</Text>
        <Spacer y={3}>
        <Text fontWeight='700' variant='meta1'>{event.title}</Text>
        </Spacer>
        <Spacer y={3.6}>
        <Tag variant="contained" color={event.tag.color} background={event.tag.backgroundColor}>{event.tag.name}</Tag>
        </Spacer>
        <FlexContainer justifySpaceBetween={true}>
          {/* {event.dates.filter(e => e.date.getTime() === date.getTime()).map(e => <Text>{e.startTime} - {e.endTime}</Text>)} */}
          <Text variant='meta1' color='#d05f5f' fontWeight='700'>{event.dates[0].startTime} - {event.dates[0].endTime}</Text>
          <LikeContainer event={event}/>
        </FlexContainer>
      </div>

    </FlexContainer>

  )
}

export default Event