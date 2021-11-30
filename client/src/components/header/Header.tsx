import React from 'react'
import styled from 'styled-components'
import Auth from '../auth/Auth'
import { FlexContainer } from 'cornell-glue-ui'
import PageContainer from '../layout/PageContainer'
import Logo from '../Logo'

const Header = () => {
  return (
    <Container>
      <PageContainer>
        <Row alignCenter justifySpaceBetween fullWidth>
          <Logo />
          <div />
          <Auth />
        </Row>
      </PageContainer>
    </Container>
  )
}

const Container = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.border.default};
`

const Row = styled(FlexContainer)`
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
`

export default Header
