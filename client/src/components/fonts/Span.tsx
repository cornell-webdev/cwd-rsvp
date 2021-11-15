import React from 'react'
import styled from 'styled-components'

interface SpanProps extends StyledSpanProps {
  children: React.ReactNode
}

interface StyledSpanProps {
  fontWeight?: number
  color?: string
  underline?: boolean
}

const StyledSpan = styled.span<StyledSpanProps>`
  // fontWeight
  font-weight: ${(props) => props.fontWeight && props.fontWeight};

  // color
  color: ${(props) => props.color && props.color};

  // underline
  text-decoration: ${(props) => props.underline && 'underline'};
`

const Span = ({ children, ...rest }: SpanProps) => {
  return (
    <StyledSpan {...rest}>
      {children}
    </StyledSpan>
  )
}

export default Span
