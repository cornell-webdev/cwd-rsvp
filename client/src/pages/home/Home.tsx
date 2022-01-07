import React, { useState, useEffect } from "react"
import styled from 'styled-components'
// TODO: custom history definition
// import history from 'src/util/history'
import EventCard from 'src/components/events/eventCard'
import TrendingEvent from 'src/components/events/trendingEvent'
import SearchBox from 'src/components/events/searchBox'
import FilterButton from 'src/components/events/FilterButton'

import eve from './eve'
import {FlexContainer, Text, Tag, Button} from 'cornell-glue-ui'
import { IEvent, IEventDate } from 'src/types/event.type'

const Home = () => {
  const [filteredData, setFilteredData] = useState(eve);
  const [Data, setData] = useState(eve);
  const [TrendingData, setTrendingData] = useState(eve);
  const [Search, setSearch] = useState(false);
  const [numPressed, setnumPressed] = useState(0);
  const [expandToday, setExpandToday] = useState(false);
  const [expandTomorrow, setExpandTomorrow] = useState(false);


  // useEffect(() => {
  //   if (Data !== undefined) {
  //     getSiteSchedule({ site, startDate: startEndDate[0], endDate: startEndDate[1] }).then((siteScheduleDTO) => {
  //       setSiteSchedule(new SiteSchedule(siteScheduleDTO))
  //       setInitialIcmVsoRatio([siteScheduleDTO.icmRatio, siteScheduleDTO.vsoRatio])
  //     })
  //   }
  // }, [site])

  function filter1(tag:string){
    setFilteredData([...new Set([...Data.filter(e => (e.tag.name === tag)), ...filteredData])]); 
    setnumPressed(numPressed+1)
  }

  function filter2(tag:string){
    setFilteredData(filteredData.filter(e => (e.tag.name !== tag)))
    setnumPressed(numPressed-1)

  }

  function getEventByDate(date:Date, data:IEvent[], expand:boolean){
    const eventByDate = data.map(e=>(e.dates.filter((ed)=>(ed.date.getDate()===date.getDate())).map((ed) =>(
      <EventCard event={e} startTime={ed.startTime} endTime={ed.endTime}/>
  ))))

    return (expand ? eventByDate : eventByDate.flat().slice(0,2))
    
  }
  
  function getFilteredData(){
    return(
      filteredData.map(e => (e.dates.map(ed => (
        <EventCard event = {e} startTime = {ed.startTime} endTime={ed.endTime} date={ed.date}/>
      ))))
    )}

  const today = new Date()
  const tomorrow = new Date()
  tomorrow.setDate(today.getDate() + 1)
  var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

  return ( 
    <div>
      <EventText>Trending</EventText>
      <TrendingContainer>
      {TrendingData.map(e=>(
          <TrendingEvent event={e} date={e.dates[0].date} time= {e.dates[0].startTime}/>
        ))}
      </TrendingContainer>   
      <SearchContainer justifyCenter = {true}>
        <SearchBox placeholder="input" data={Data} setFilteredData={setFilteredData} setSearch={setSearch} />
      </SearchContainer>
      {
        Search === false ? (
          <div>
            <TrendingContainer>
              <FilterButton tag='Entertainment' color='#E8AC15' backgroundColor='#FEF3D6' functionPress={filter1} functionUnpress={filter2} />
              <FilterButton tag='Professional' color='#71B6BA' backgroundColor='#E9F5F5' functionPress={filter1} functionUnpress={filter2}/>
            </TrendingContainer>
            <DateText>Today</DateText>
            {numPressed === 0 ? 
            (<div>{getEventByDate(today, Data, expandToday)}
            <FlexContainer alignEnd={true}><ExpandButton background="#F8F8F8" color='#212121' onClick={()=>{setExpandToday(!expandToday)}}>Show more</ExpandButton></FlexContainer>
            </div>): 
            getEventByDate(today, filteredData, true)}
            <DateText>{days[tomorrow.getDay()]}</DateText>
            {numPressed === 0 ? getEventByDate(tomorrow, Data, expandTomorrow) : getEventByDate(tomorrow, filteredData, true)}
          </div>
        ):(
          <div>{getFilteredData()}</div>
        )
      }
    </div>              
  )
}

const EventText = styled(Text)`
font-size: 22px;
font-weight: 700;
padding: 6px 12px 6px 12px;
`
const DateText = styled(EventText)`
font-size: 16px;
`
const SearchContainer = styled(FlexContainer)`
padding: 12px;
`
const TrendingContainer = styled(FlexContainer)`
padding: 6px 12px 14px;
`
const ExpandButton = styled(Button)`
width:91px;
height:22px;
font-size: 14px;
padding: 3px 10px;
margin-right: 12px;
float:right;
`



export default Home
