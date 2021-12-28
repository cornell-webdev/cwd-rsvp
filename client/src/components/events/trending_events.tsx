import React, { useEffect, useState } from 'react'
import { Text, Tag } from 'cornell-glue-ui'
import LikeContainer from './like'
import { FlexContainer } from 'cornell-glue-ui'
import { IEvent, IEventDate } from 'src/types/event.type'
import { IUser } from 'src/types/user.type'
import './event.css'



interface TrendingEventProps {
  event: IEvent, 
  date: Date,
  time: string
}

const TrendingEvent: React.FC<TrendingEventProps> = ({event, date, time}) => {

    const shadow = {
      boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
    };

    var desc = event.title
  
    if (event.title.length > 15){
      desc = event.title.substring(0, 16) + '...'
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


    return (
        <div style={shadow} className='trendingEvent'>
          <img className='img2' src={event.imgs[0]}/>
          <div>
              <Text className='text2' fontWeight='700' variant='meta1' color='#9E9E9E'>{getTime(time) + ', ' + getDate(date)}</Text>
              <FlexContainer className='text2' justifySpaceBetween={true} alignCenter={true}>
              {/* {event.dates.filter(e => e.date.getTime() === date.getTime()).map(e => <Text>{e.startTime} - {e.endTime}</Text>)} */}
              <Text fontWeight='700' variant='meta1' color='#212121'>{desc}</Text>
              <LikeContainer event={event}/>
              </FlexContainer>
          </div>
        </div>

  )
}

export default TrendingEvent