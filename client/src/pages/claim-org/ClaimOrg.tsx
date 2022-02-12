import { Button, Spacer, Text, theme } from 'cornell-glue-ui'
import React from 'react'
import BackButton from 'src/components/BackButton'
import { useAllOrgs } from 'src/api/org'
import PageContainer from 'src/components/layout/PageContainer'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'
import SearchBox from 'src/components/events/SearchBox'
import ClaimOrgCard from './ClaimOrgCard'
import { useSearchedOrgs } from 'src/api/org'

const ClaimOrg = () => {
  const router = useRouter()
  const query = router.query?.query
  const { searchedOrgs } = useSearchedOrgs(query)

  return (
    <PageContainer isMobileOnly isShowWarning={false}>
      <Container>
        <BackButton onClick={() => router.history.goBack()} />
        <Spacer y={0.75} />
        <Text variant='h4' fontWeight={700}>
          Claim organization
        </Text>
        <SearchBox placeholder='search for your organization' />
        {searchedOrgs?.map((x) => (
          <ClaimOrgCard org={x} />
        ))}
      </Container>
    </PageContainer>
  )
}

const Container = styled.div``

export default ClaimOrg
