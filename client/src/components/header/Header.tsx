import React from 'react'
import styled from 'styled-components'
import Auth from '../auth/Auth'
import { Button, FlexContainer } from 'cornell-glue-ui'
import PageContainer from '../layout/PageContainer'
import Logo from '../Logo'
import AddIcon from '@material-ui/icons/Add'
import { Link } from 'react-router-dom'
import { useCurrentUser } from 'src/api/user'

const Header = () => {
  const { currentUser } = useCurrentUser()

  return (
    <Container>
      <PageContainer>
        <Row alignCenter justifySpaceBetween fullWidth>
          <Logo />
          <RightSection isSignedIn={currentUser !== null}>
            <Link to='/new'>
              <Button startIcon={<AddIcon />}>Event</Button>
            </Link>
            <Auth />
          </RightSection>
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

interface IRightSectionProps {
  isSignedIn: boolean
}

const RightSection = styled(FlexContainer)<IRightSectionProps>`
  flex-direction: row-reverse;

  & > * {
    margin-left: 1rem;
  }

  /* isSignedIn */
  flex-direction: ${(props) => props.isSignedIn && 'row'};
`

export default Header
