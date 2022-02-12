import { Button, Spacer, Text, theme } from 'cornell-glue-ui'
import React from 'react'
import BackButton from 'src/components/BackButton'
import OrgForm from 'src/components/forms/OrgForm'
import PageContainer from 'src/components/layout/PageContainer'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'

const ClaimOrg = () => {
  const router = useRouter()

  return (
    <PageContainer isMobileOnly isShowWarning={false}>
      <Container>
        <BackButton onClick={() => router.history.goBack()} />
        <Spacer y={0.75} />
        <Text variant='h4' fontWeight={700}>
          Claim organization
        </Text>
        {/* <OrgForm /> */}
      </Container>
    </PageContainer>
  )
}

const Container = styled.div``

export default ClaimOrg
