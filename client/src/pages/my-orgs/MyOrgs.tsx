import { Button, Spacer, Text } from 'cornell-glue-ui'
import React from 'react'
import PageContainer from 'src/components/layout/PageContainer'
import styled from 'styled-components'
import AddIcon from '@mui/icons-material/Add'
import { ReactComponent as EmptyStateIllust } from 'src/assets/svgs/my-orgs-empty-state.svg'
import { Link } from 'react-router-dom'
import { useMyOrgs } from 'src/api/org'
import MyOrgCard from './MyOrgCard'
import EmptyState from 'src/components/EmptyState'

const MyOrgs = () => {
  const { myOrgs } = useMyOrgs()

  return (
    <PageContainer isMobileOnly>
      <Container>
        <Text variant='h4' fontWeight={700}>
          My organizations
        </Text>
        <Spacer y={0.75} />
        <Link to='/claim-org'>
          <Button startIcon={<AddIcon />}>Org</Button>
        </Link>
        {myOrgs && myOrgs?.length > 0 ? (
          <>
            <Spacer y={1} />
            {myOrgs.map((org) => (
              <MyOrgCard key={org?._id} org={org} />
            ))}
          </>
        ) : (
          <EmptyState
            illustration={<EmptyStateIllust />}
            text1='Your account is not linked with any organizations at this moment.'
            text2='You may claim an existing organization or create an organization.'
          />
        )}
      </Container>
    </PageContainer>
  )
}

const Container = styled.div``

export default MyOrgs
