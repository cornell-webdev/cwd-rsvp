import React from 'react'
import styled from 'styled-components'
import Auth from '../auth/Auth'
import { FlexRow } from '../layout/Flex'
import DesktopContainer from '../layout/DesktopContainer'
import Logo from '../Logo'

const Header = () => {
  return (
    <Container>
      <DesktopContainer>
        <Row alignCenter justifySpaceBetween fullWidth>
          <Logo />
          <div />
          <Auth />
        </Row>
      </DesktopContainer>
    </Container>
  )
}

const Container = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.border.default};
`

const Row = styled(FlexRow)`
  padding: 0.5rem 0.5rem 0.5rem 1.5rem;
`

export default Header
