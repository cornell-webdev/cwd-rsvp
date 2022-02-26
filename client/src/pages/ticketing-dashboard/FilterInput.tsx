import styled from 'styled-components'

const FilterInput = styled.input`
  font-size: 1rem;
  border: 2px solid ${(props) => props.theme.border.default};
  border-radius: 8px;
  padding: 0.45rem 0.7rem;
  width: 50%;
  min-width: 200px;

  &:hover,
  &:focus {
    border-color: ${(props) => props.theme.border.dark};
  }

  &::placeholder {
    color: ${(props) => props.theme.text.placeholder};
  }
`

export default FilterInput
