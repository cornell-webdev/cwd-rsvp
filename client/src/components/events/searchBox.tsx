import React, { useState } from "react";
import {CloseCircleFilled, SearchOutlined} from '@ant-design/icons';
import styled from 'styled-components'
import { IEvent, IEventDate } from 'src/types/event.type'
import { FlexContainer } from "cornell-glue-ui";

interface ISearchboxProps{
  placeholder: string;
  data: IEvent[];
  setFilteredData:  Function
  setSearch: Function
}

function SearchBox({ placeholder, data, setFilteredData, setSearch}: ISearchboxProps) {
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = data.filter((value) => {
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData(data);
      setSearch(false);
    } else {
      setFilteredData(newFilter);
      setSearch(true);
    }
  };

  const clearInput = () => {
    setFilteredData(data);
    setWordEntered("");
    setSearch(false)
  };

  return (
      <SearchContainer alignCenter={true}>
        <SearchIcon />
        <SearchInput
          type="text"
          placeholder={placeholder}
          value={wordEntered}
          onChange={handleFilter}
        />
          {wordEntered !== undefined && wordEntered.length === 0 ? (
            null
          ) : (
            <Clear onClick={clearInput} role="button" onMouseDown={e => e.preventDefault()}/>
          )}
      </SearchContainer>
  );
}

const SearchContainer = styled(FlexContainer)`
width: 351px;
height: 28px;
font-size: 16px;
border: 1.5px solid #E0E0E0;
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
color: #E0E0E0;
width: 14px;
height: 14px;
margin: 11px 7px
`

export default SearchBox;

