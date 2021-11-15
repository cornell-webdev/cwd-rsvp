import React from 'react'
import styled from 'styled-components'
import { FlexRow } from './Flex'

interface PageContainerProps {
  children: React.ReactNode
}
const PageContainer = ({ children }: PageContainerProps) => {
  return (
    <FlexRow justifyCenter>
      <Container>{children}</Container>
    </FlexRow>
  )
}

const Container = styled.div`
  padding: 1rem;
  width: 100%;

  @media (min-width: ${(props) => props.theme.tablet}) {
    max-width: 800px;
  }
`

export default PageContainer
