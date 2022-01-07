import { FlexContainer } from 'cornell-glue-ui'
import React from 'react'
import styled from 'styled-components'

interface IVerticalButtonsContainerProps {
  children: React.ReactNode
}

const VerticalButtonsContainer = ({ children }: IVerticalButtonsContainerProps) => {
  return (
    <FlexContainer justifyCenter>
      <Container>{children}</Container>
    </FlexContainer>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 130px;
  align-items: stretch;

  & button {
    text-align: center;
    display: inline-block;
    width: 100%;
  }
`

export default VerticalButtonsContainer
