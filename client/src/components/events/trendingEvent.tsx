import React from 'react'
import styled from 'styled-components'
import { Text} from 'cornell-glue-ui'
import LikeButton from './likeButton'
import { FlexContainer } from 'cornell-glue-ui'
import { IEvent, IEventDate } from 'src/types/event.type'
import { IUser } from 'src/types/user.type'

interface ITrendingEventProps {
  event: IEvent, 
  date: Date,
  time: string
}

const TrendingEvent: React.FC<ITrendingEventProps> = ({event, date, time}:ITrendingEventProps) => {

    const shadow = {
      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
    };

    var desc = event.title
  
    if (event.title.length > 15){
      desc = event.title.substring(0, 16) + '...'
    }

    return (
        <TrendingEventContainer style={shadow} className='trendingEvent'>
          <ImgContainer src={event.imgs[0]}/>
          <div>
            <Container>
              <Text fontWeight= '700' variant= 'meta1' color='#9E9E9E'>{getTime(time) + ', ' + getDate(date)}</Text>
            </Container>
            <Container justifySpaceBetween={true} alignCenter={true}>
              <Text fontWeight= '700' variant= 'meta1' color='#212121'>{desc}</Text>
              <LikeButton event={event}/>
            </Container>
          </div>
        </TrendingEventContainer>

  )
}

function getTime (time: string) {
  const hour = parseInt(time.substring(0,2))
  if(hour < 12){
    return hour.toString() + ':' + time.substring(2, 4) + ' am'
  }else if (hour > 12){
    return (hour-12).toString() + ':' + time.substring(2,4) + ' pm'
  }else {
    return hour.toString() + ':' + time.substring(2, 4) + ' pm'
  }
}

function getDate(date: Date){
  const day = date.toLocaleString('default', {month: 'short', day: 'numeric' })
  return day
}

const Container = styled(FlexContainer)`
  margin: 0.5px 12px;
`;

const ImgContainer = styled.img`
  border-radius: 6px 6px 0px 0px;
  width:200px;
  height:90px;
`;

const TrendingEventContainer = styled.div`
  width:200px;
  height:150px;
  border-radius: 6px;
  margin-inline: 12px;
  margin: 0px 12px ;
`

export default TrendingEvent