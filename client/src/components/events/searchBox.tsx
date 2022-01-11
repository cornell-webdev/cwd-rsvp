import React, { useState, useEffect } from 'react'
import { CloseCircleFilled, SearchOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { IEvent, IEventDate } from 'src/types/event.type'
import { FlexContainer } from 'cornell-glue-ui'
// import {useSearchedEvents} from "../../api/event"

interface ISearchboxProps {
  placeholder: string
  handleFilter: (event: React.KeyboardEvent<HTMLInputElement>) => void
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
  clearInput: () => void
  wordEntered: string
}

function SearchBox({
  placeholder,
  handleFilter,
  clearInput,
  handleSearch,
  wordEntered,
}: ISearchboxProps) {
  // const [wordEntered, setWordEntered] = useState("");

  // const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const searchWord = event.target.value;
  //   setWordEntered(searchWord);
  //   // const newFilter = data.filter((value) => {
  //   //   return value.title.toLowerCase().includes(searchWord.toLowerCase());
  //   // });
  //   // const {searchedEvents} = useSearchedEvents(searchWord)

  //   useEffect(() => {
  //     const {searchedEvents} = useSearchedEvents(searchWord)
  //     if (searchWord !== "") {
  //       setFilteredData(searchedEvents);
  //     }
  //   }, [wordEntered])

  //   if (searchWord === "") {
  //     setFilteredData(data);
  //     setSearch(false);
  //   }
  //   // } else {
  //   //   setFilteredData(searchedEvents);
  //   //   setSearch(true);
  //   // }
  // };

  return (
    <SearchContainer alignCenter={true}>
      <SearchIcon />
      <SearchInput
        type='text'
        placeholder={placeholder}
        value={wordEntered}
        onChange={handleSearch}
        onKeyPress={handleFilter}
        // onPressEnter={handleSearch}
      />
      {wordEntered !== undefined && wordEntered.length === 0 ? null : (
        <Clear onClick={clearInput} role='button' onMouseDown={(e) => e.preventDefault()} />
      )}
    </SearchContainer>
  )
}

const SearchContainer = styled(FlexContainer)`
  width: 351px;
  height: 28px;
  font-size: 16px;
  border: 1.5px solid #e0e0e0;
  border-radius: 6px;
`
const SearchInput = styled.input`
  width: 300px;
`

const Clear = styled(CloseCircleFilled)`
color: #E0E0E0;
width = 8px
height = 8px
`

const SearchIcon = styled(SearchOutlined)`
  color: #e0e0e0;
  width: 14px;
  height: 14px;
  margin: 11px 7px;
`

export default SearchBox
