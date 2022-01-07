import React, { useState } from "react"
import styled from 'styled-components'
import {FlexContainer, Text, Tag} from 'cornell-glue-ui'
import { IEvent, IEventDate } from 'src/types/event.type'

interface IFilterProps{
    tag: string
    color: string
    backgroundColor: string
    functionPress: Function
    functionUnpress: Function
  }

const FilterButtonContainer = styled.button`
  margin-inline: 6px;
  background: transparent;
  `
const FilterTag = styled(Tag)`
cursor: pointer;

`
const FilterButton:React.FC<IFilterProps> = ({tag, color, backgroundColor, functionPress, functionUnpress}) => {
const [pressed, setPressed] = useState(false)
if(!pressed){
    
    return(
    <FilterButtonContainer onClick={() => { functionPress(tag); setPressed(true)}}><FilterTag variant="outlined" color={color}>{tag}</FilterTag></FilterButtonContainer>
    )
}else{
    return(
    <FilterButtonContainer onClick={() => { functionUnpress(tag); setPressed(false)}}><FilterTag variant="contained" color={color} background={backgroundColor}>{tag}</FilterTag></FilterButtonContainer>
    )
}
}
  
export default FilterButton