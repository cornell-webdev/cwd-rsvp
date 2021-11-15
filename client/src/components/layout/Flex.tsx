import styled from 'styled-components'

interface FlexElementProps {
  justifyStart?: boolean
  justifySpaceBetween?: boolean
  justifyCenter?: boolean
  justifyEnd?: boolean
  alignStart?: boolean
  alignCenter?: boolean
  alignEnd?: boolean
  flexDirection?: string
  wrap?: boolean
  fullWidth?: boolean
  fullHeight?: boolean
}

const FlexElement = styled.div<FlexElementProps>`
  display: flex;

  // justifyStart
  justify-content: ${(props) => props.justifyStart && 'flex-start'};

  // justifySpaceBetween
  justify-content: ${(props) => props.justifySpaceBetween && 'space-between'};

  // justifyCenter
  justify-content: ${(props) => props.justifyCenter && 'center'};

  // justifyEnd
  justify-content: ${(props) => props.justifyEnd && 'flex-end'};

  // alignStart
  align-items: ${(props) => props.alignStart && 'flex-start'};

  // alignCenter
  align-items: ${(props) => props.alignCenter && 'center'};

  // alignEnd
  align-items: ${(props) => props.alignEnd && 'flex-end'};

  // flexDirection
  flex-direction: ${(props) => props.flexDirection && props.flexDirection};

  // wrap
  flex-wrap: ${(props) => props.wrap && 'wrap'};

  // fullWidth
  width: ${(props) => props.fullWidth && '100%'};

  // fullHeight
  height: ${(props) => props.fullHeight && '100%'};
`

export const FlexColumn = styled(FlexElement)`
  flex-direction: column;
`

export const FlexRow = styled(FlexElement)`
`
