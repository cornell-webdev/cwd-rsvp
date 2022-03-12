import { Text } from 'cornell-glue-ui'
import React from 'react'
import PageContainer from 'src/components/layout/PageContainer'
import styled from 'styled-components'
import Jay from './developers/Jay'
import Chris from './developers/Chris'
import Justin from './developers/Justin'
import Melinda from './developers/Melinda'
import MemberCRUD from './member-crud/MemberCRUD'

const DevTraining = () => {
  return (
    <PageContainer>
      <Container>
        <Text variant='h4'>SP22 Dev training</Text>
        <MemberCRUD />
        <Jay />
        <Chris />
        <Justin />
        <Melinda />
      </Container>
    </PageContainer>
  )
}

const Container = styled.div`
  & > * {
    margin-bottom: 2rem;
  }
`

export default DevTraining
