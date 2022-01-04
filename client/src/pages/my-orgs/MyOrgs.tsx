import { Button, Spacer, Text } from 'cornell-glue-ui'
import React from 'react'
import PageContainer from 'src/components/layout/PageContainer'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add'
import { ReactComponent as EmptyStateIllust } from 'src/assets/svgs/my-orgs-empty-state.svg'
import { Link } from 'react-router-dom'
import { useMyOrgs } from 'src/api/org'
import MyOrgCard from './MyOrgCard'

const MyOrgs = () => {
  const { myOrgs } = useMyOrgs()

  return (
    <PageContainer>
      <Container>
        <Text variant='h4' fontWeight={700}>
          My organizations
        </Text>
        <Spacer y={1.5} />
        <Link to='/new-org'>
          <Button startIcon={<AddIcon />}>Org</Button>
        </Link>
        {myOrgs && myOrgs?.length > 0 ? (
          <>
            <Spacer y={2} />
            {myOrgs.map((org) => (
              <MyOrgCard key={org?._id} org={org} />
            ))}
          </>
        ) : (
          <EmptyStateContainer>
            <FixedWidthContainer>
              <StyledEmptyStateIllust />
              <Text variant='meta1' textAlign='center'>
                Your account is not linked with any organizations at this moment. You may claim an
                existing organization or create an organization.
              </Text>
            </FixedWidthContainer>
          </EmptyStateContainer>
        )}
      </Container>
    </PageContainer>
  )
}

const Container = styled.div``

const EmptyStateContainer = styled.div`
  margin-top: 5rem;
  display: flex;
  justify-content: center;
`

const FixedWidthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 360px;
`

const StyledEmptyStateIllust = styled(EmptyStateIllust)`
  margin-bottom: 1rem;
  width: 60vw;

  @media (min-width: ${(props) => props.theme.large}) {
    width: 30vw;
  }
`

export default MyOrgs
