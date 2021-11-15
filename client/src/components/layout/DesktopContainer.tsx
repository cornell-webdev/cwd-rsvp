import React from 'react'
import styled from 'styled-components'

interface DesktopContainerProps extends ContainerProps {
  children: React.ReactNode
}

interface ContainerProps {
  height?: string
}

export const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > div {
    width: 100%;
  }

  @media (min-width: ${(props) => props.theme.tablet}) {
    & > div {
      width: 90%;
    }
  }

  // height
  height: ${(props) => props.height && props.height};
`

const DesktopContainer = ({ children, height }: DesktopContainerProps) => {
  return (
    <Container height={height}>
      <div>
        {children}
      </div>
    </Container>
  )
}

export default DesktopContainer
