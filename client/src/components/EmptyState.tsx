import { Spacer, Text } from 'cornell-glue-ui'
import React from 'react'
import styled from 'styled-components'

interface IEmptyStateProps {
  illustration: React.ReactNode
  text1: string
  text2: string
}

const EmptyState = ({ illustration, text1, text2 }: IEmptyStateProps) => {
  return (
    <Container>
      <FixedWidthContainer>
        {illustration}
        <Text variant='meta1' textAlign='center'>
          {text1}
        </Text>
        <Spacer y={0.5} />
        <Text variant='meta1' textAlign='center'>
          {text2}
        </Text>
      </FixedWidthContainer>
    </Container>
  )
}

const Container = styled.div`
  margin: 5rem 0;
  display: flex;
  justify-content: center;
`

const FixedWidthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80vw;

  & svg {
    margin-bottom: 1rem;
    width: 60vw;

    @media (min-width: ${(props) => props.theme.small}) {
      width: 25vw;
    }
  }
`

export default EmptyState
