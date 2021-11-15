import React from 'react'
import styled from 'styled-components'

interface LabelProps {
  children: React.ReactNode
  disabled?: boolean
  noMargin?: boolean
}

const Label = ({ children, ...rest }: LabelProps) => {
  return (
    <StyledLabel {...rest}>
      {children}
    </StyledLabel>
  )
}

interface StyledLabelProps {
  disabled?: boolean
  noMargin?: boolean
}

const StyledLabel = styled.label<StyledLabelProps>`
  font-weight: 500;
  font-size: .9rem;
  letter-spacing: -0.4px;
  margin-bottom: .4rem;
  color: ${(props) => props.theme.text.default};
  display: block;
  text-transform: uppercase;

  // disabled
  color: ${(props) => props.disabled && props.theme.textLight};

  // noMargin
  margin-bottom: ${(props) => props.noMargin && '0'};
`

export default Label
