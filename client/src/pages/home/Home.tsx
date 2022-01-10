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
import { useTrendingEvents } from "src/api/event"
import {useSearchedEvents} from "../../api/event"

function Home () {
  const [filteredData, setFilteredData] = useState<IEvent[]>([]);
  const [Data, setData] = useState<IEvent[]>(eve);
  const [searchData, setSearchData] = useState<IEvent[]>([]);
  const [TrendingData, setTrendingData] = useState<IEvent[]>(eve);
  const [Search, setSearch] = useState(false);
  const [numPressed, setnumPressed] = useState(0);
  const [expandToday, setExpandToday] = useState(false);
  const [expandTomorrow, setExpandTomorrow] = useState(false);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    // const newFilter = data.filter((value) => {
    //   return value.title.toLowerCase().includes(searchWord.toLowerCase());
    // });
    // const {searchedEvents} = useSearchedEvents(searchWord)
    
    if (searchWord === "") {
      // setFilteredData(data);
      setSearch(false);
    }
    // } else {
    //   setFilteredData(searchedEvents);
    //   setSearch(true);
    // }
  };

  const clearInput = () => {
    // setFilteredData(data);
    setWordEntered("");
    setSearch(false)
  };

  useEffect(() => {
    const {searchedEvents} = useSearchedEvents(wordEntered)
    if (wordEntered !== "" && searchedEvents !== undefined) {
      setSearchData(searchedEvents);
    }
  }, [wordEntered])


  useEffect(() => {
    const { trendingEvents } = useTrendingEvents()
    if (trendingEvents !== undefined) {
      setTrendingData(trendingEvents)   
    }
  }, [TrendingData])


  function filter1(tag:string){
    if(!Search){
      setFilteredData([...new Set([...Data.filter(e => (e.tag.name === tag)), ...filteredData])]); 
      setnumPressed(numPressed+1)
    }else if(numPressed !== 2){
      setFilteredData([...new Set([...searchData.filter(e => (e.tag.name === tag)), ...filteredData])]); 
      setnumPressed(numPressed+1)
    }else{
      setFilteredData(searchData); 
      setnumPressed(numPressed+1)
    }
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
  
  function getSearchData(){
    const d = (numPressed === 0 || numPressed === 3) ? searchData : filteredData 
    return(
      d.map(e => (e.dates.map(ed => (
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
      <ScrollContainer>
        <TrendingContainer>
        {TrendingData.map(e=>(
            <TrendingEvent event={e} date={e.dates[0].date} time= {e.dates[0].startTime}/>
          ))}
        </TrendingContainer> 
      </ScrollContainer>
  
      <SearchContainer justifyCenter = {true}>
        <SearchBox placeholder="input" handleFilter={handleFilter} clearInput={clearInput} wordEntered={wordEntered} />
      </SearchContainer>
      <TrendingContainer>
        <FilterButton tag='Entertainment' color='#E8AC15' backgroundColor='#FEF3D6' functionPress={filter1} functionUnpress={filter2} />
        <FilterButton tag='Professional' color='#71B6BA' backgroundColor='#E9F5F5' functionPress={filter1} functionUnpress={filter2}/>
      </TrendingContainer>
      {
        Search === false && filteredData !== undefined ? (
          <div>
            <DateText>Today</DateText>
            {numPressed === 0 ? 
            getEventByDate(today, Data, expandToday):
            getEventByDate(today, filteredData, expandToday)}
            <ButtonContainer justifyEnd={true}>
              <ExpandButton background="#F8F8F8" color='#212121' onClick={()=>{setExpandToday(!expandToday)}}>
                {expandToday ? 'Show less' : 'Show more'}
              </ExpandButton>
            </ButtonContainer>
            <DateText>{days[tomorrow.getDay()]}</DateText>
            {numPressed === 0 ? getEventByDate(tomorrow, Data, expandTomorrow): getEventByDate(tomorrow, filteredData, expandTomorrow)}
            <ButtonContainer justifyEnd={true}>
                <ExpandButton background="#F8F8F8" color='#212121' onClick={()=>{setExpandTomorrow(!expandTomorrow)}}>
                  {expandTomorrow ? 'Show less' : 'Show more'}
                </ExpandButton>
              </ButtonContainer> 
          </div>
        ):(
          <div>{getSearchData()}</div>
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
padding: 6px 12px 6px;
`
const TrendingContainer = styled(FlexContainer)`
padding: 6px 7.5px 14px;
overflow-x: scroll;
white-space: nowrap;
`
const ScrollContainer = styled.div`
overflow: hidden;
-ms-overflow-style: none;  /* IE and Edge */
scrollbar-width: none;  /* Firefox */
`
const ExpandButton = styled(Button)`
width:91px;
height:22px;
font-size: 14px;
padding: 3px 10px;
float:right;
`

const ButtonContainer = styled(FlexContainer)`
padding: 8px 12px;

`



export default Home
