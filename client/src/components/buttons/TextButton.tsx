import React from 'react'
import styled from 'styled-components'

interface TextButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const TextButton = ({ children, ...rest }: TextButtonProps) => {
  return <StyledButton {...rest}>{children}</StyledButton>
}

const StyledButton = styled.button`
  font-size: 0.9rem;
  padding: 0.4rem 0.4rem;
  cursor: pointer;
  border-radius: 8px;
  color: ${(props) => props.theme.brand[400]};
  background: inherit;

  &:hover {
    background: ${(props) => props.theme.grey[50]};
  }
`

export default TextButton
