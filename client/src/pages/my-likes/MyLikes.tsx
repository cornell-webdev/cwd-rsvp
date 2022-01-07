import { Spacer, Text } from 'cornell-glue-ui'
import React from 'react'
import PageContainer from 'src/components/layout/PageContainer'
import styled from 'styled-components'

const MyLikes = () => {
  return (
    <PageContainer>
      <Container>
        <Text variant='h4' fontWeight={700}>
          My likes
        </Text>
        <Spacer y={1.5} />
        {/* TODO: use event card developed by Melinda */}
        <Text variant='h4' fontWeight={700}>
          More events
        </Text>
        <Spacer y={1.5} />
      </Container>
    </PageContainer>
  )
}

const Container = styled.div``

export default MyLikes
