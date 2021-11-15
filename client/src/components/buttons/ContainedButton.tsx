import React from 'react'
import theme from 'src/app/theme'
import styled from 'styled-components'

interface ContainedButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  background?: string
  color?: string
}

const ContainedButton = ({
  background = theme.brand[500],
  color = theme.grey[0],
  ...rest
}: ContainedButtonProps) => {
  return <Container {...rest} background={background} color={color}></Container>
}

interface IContainerProps {
  background: ContainedButtonProps['background']
  color: ContainedButtonProps['color']
}

const Container = styled.button<IContainerProps>`
  border-radius: 8px;
  font-size: 1rem;
  font-weight: medium;
  padding: 0.5rem 0.8rem;

  /* background */
  background: ${(props) => props.background && props.background};

  /* color */
  color: ${(props) => props.color && props.color};
`

export default ContainedButton
