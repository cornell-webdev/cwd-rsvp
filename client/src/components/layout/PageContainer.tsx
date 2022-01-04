import React from 'react'
import styled from 'styled-components'

interface PageContainerProps {
  children: React.ReactNode
  height?: string
}

const PageContainer = ({ children, height }: PageContainerProps) => {
  return (
    <Container height={height}>
      <div>{children}</div>
    </Container>
  )
}

interface ContainerProps {
  height?: PageContainerProps['height']
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    width: 100%;
    padding: 0.75rem;
  }

  @media (min-width: ${(props) => props.theme.tablet}) {
    & > div {
      width: ${(props) => props.theme.tablet};
    }
  }

  // height
  height: ${(props) => props.height && props.height};
`

export default PageContainer
