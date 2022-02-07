import { Spacer, Text } from 'cornell-glue-ui'
import React from 'react'
import { useOrgById } from 'src/api/org'
import BackButton from 'src/components/BackButton'
import OrgForm from 'src/components/forms/OrgForm'
import PageContainer from 'src/components/layout/PageContainer'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'

const EditOrg = () => {
  const router = useRouter()
  const orgId = router.match.params.orgId
  const { org } = useOrgById(orgId)

  return (
    <PageContainer isMobileOnly isShowWarning={false}>
      <Container>
        <BackButton onClick={() => router.history.goBack()} />
        <Spacer y={0.75} />
        <Text variant='h4' fontWeight={700}>
          Edit profile
        </Text>
        {org && (
          <OrgForm
            initValues={{
              _id: org?._id,
              name: org?.name,
              desc: org?.desc,
              website: org?.website,
              avatar: org?.avatar,
            }}
          />
        )}
      </Container>
    </PageContainer>
  )
}

const Container = styled.div``

export default EditOrg
