import styled from 'styled-components'

interface DividerProps {
  width?: string
}

export const Divider = styled.div<DividerProps>`
  width: 70%;
  border-bottom: 1px solid ${(props) => props.theme.border.default};

  // width
  width: ${(props) => props.width && props.width};  
`
