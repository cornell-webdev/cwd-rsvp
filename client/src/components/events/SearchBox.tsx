import { CloseCircleFilled, SearchOutlined } from '@ant-design/icons'
import { FlexContainer } from 'cornell-glue-ui'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDebounce } from 'use-debounce'

interface ISearchboxProps {
  query: string
  setQuery: React.Dispatch<React.SetStateAction<string>>
}

function SearchBox({ query, setQuery }: ISearchboxProps) {
  const [value, setValue] = useState<string>('')
  const [debouncedValue] = useDebounce(value, 1000)

  useEffect(() => {
    setQuery(debouncedValue)
  }, [debouncedValue])

  return (
    <Container>
      <SearchContainer alignCenter={true}>
        <SearchIcon />
        <SearchInput
          type='text'
          placeholder='Search event'
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        {value && value?.length !== 0 && (
          <Clear
            onClick={() => {
              setValue('')
              setQuery('')
            }}
            role='button'
            onMouseDown={(e) => e.preventDefault()}
          />
        )}
      </SearchContainer>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  padding: 0.5rem;
  margin-top: 0.5rem;
`

const SearchContainer = styled(FlexContainer)`
  width: 100%;
  font-size: 16px;
  border: 1.5px solid #e0e0e0;
  border-radius: 6px;
  padding: 0.2rem 0.5rem;
`
const SearchInput = styled.input`
  width: 100%;
  font-size: 1rem;
  padding: 0.2rem;
`

const Clear = styled(CloseCircleFilled)`
  color: #e0e0e0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const SearchIcon = styled(SearchOutlined)`
  color: #e0e0e0;
  width: 14px;
  height: 14px;
  margin-left: 0.2rem;
  margin-right: 0.5rem;
`

export default SearchBox
