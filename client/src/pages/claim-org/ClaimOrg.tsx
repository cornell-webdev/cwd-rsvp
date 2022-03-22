import { Spacer, Text } from 'cornell-glue-ui'
import React from 'react'
import { useSearchedOrgs } from 'src/api/org'
import BackButton from 'src/components/BackButton'
import SearchBox from 'src/components/events/SearchBox'
import PageContainer from 'src/components/layout/PageContainer'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'
import ClaimOrgCard from './ClaimOrgCard'

const ClaimOrg = () => {
  const router = useRouter()
  const query = router.query?.query
  const { searchedOrgs } = useSearchedOrgs(query)

  return (
    <PageContainer isMobileOnly isShowWarning={false}>
      <Container>
        {/* <Link to={`/profile/my-orgs`}> */}
        <BackButton />
        {/* </Link> */}
        <Spacer y={0.75} />
        <Text variant='h4' fontWeight={700}>
          Claim organization
        </Text>
        <SearchBox placeholder='search for your organization' />
        {searchedOrgs?.map((x) => (
          <ClaimOrgCard key={x?._id} org={x} />
        ))}
      </Container>
    </PageContainer>
  )
}

const Container = styled.div``

export default ClaimOrg
