import AddIcon from '@mui/icons-material/Add'
import { Button, FlexContainer } from 'cornell-glue-ui'
import React from 'react'
import { Link } from 'react-router-dom'
import { useCurrentUser } from 'src/api/user'
import styled from 'styled-components'
import Auth from '../auth/Auth'
import PageContainer from '../layout/PageContainer'
import Logo from '../Logo'

const Header = () => {
  const { currentUser } = useCurrentUser()
  // const isMobile = useIsMobile()
  // const navs = useNavs()

  return (
    <Container>
      <PageContainer isNoPadding>
        <Row alignCenter justifySpaceBetween fullWidth>
          <Logo />
          <RightSection isSignedIn={currentUser !== null}>
            {/* {!isMobile &&
              navs?.map(({ path, label }) => (
                <NavLink key={path} to={path}>
                  <NavButton
                    variant='text'
                    color={theme.text.default}
                    background={theme.background.default}
                    hoverBackground={theme.grey[100]}>
                    {label}
                  </NavButton>
                </NavLink>
              ))} */}
            <Link to='/new-event'>
              <Button startIcon={<StyledAddIcon />}>Event</Button>
            </Link>
            <Auth />
          </RightSection>
        </Row>
      </PageContainer>
    </Container>
  )
}

const Container = styled.div`
  padding: 0.4rem 0.75rem;
  padding-top: 1rem;

  @media (min-width: ${(props) => props.theme.small}) {
    padding-top: 0.6rem;
  }
`

// const NavLink = styled(Link)`
//   margin-left: 0.75rem !important;
// `

// const NavButton = styled(Button)`
//   font-weight: 600;
//   padding-left: 0.2rem;
//   padding-right: 0.2rem;
// `

const StyledAddIcon = styled(AddIcon)`
  width: 18px;
  height: 18px;
`

const Row = styled(FlexContainer)``

interface IRightSectionProps {
  isSignedIn: boolean
}

const RightSection = styled(FlexContainer)<IRightSectionProps>`
  flex-direction: row-reverse;
  align-items: center;

  & > * {
    margin-left: 1rem;
  }

  /* isSignedIn */
  flex-direction: ${(props) => props.isSignedIn && 'row'};
`

export default Header
