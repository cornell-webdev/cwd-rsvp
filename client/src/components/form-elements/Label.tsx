import React from 'react'
import styled from 'styled-components'

interface ILabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

const Label = ({ children }: ILabelProps) => {
  return <StyledLabel>{children}</StyledLabel>
}

const StyledLabel = styled.label`
  font-size: 0.875rem;
  margin-bottom: 4px;
`

export default Label
