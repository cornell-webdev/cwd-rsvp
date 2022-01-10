import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { Button, Spacer, Text, theme } from 'cornell-glue-ui'
import React from 'react'
import { useOrgById } from 'src/api/org'
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
        <Button
          variant='text'
          startIcon={<ChevronLeftIcon />}
          color={theme.text.default}
          defaultBackground={theme.grey[100]}
          onClick={() => router.history.goBack()}>
          Back
        </Button>
        <Spacer y={1.5} />
        <Text variant='h4' fontWeight={700}>
          Edit profile
        </Text>
        {org && (
          <OrgForm
            initValues={{
              _id: org?._id,
              name: org?.name,
              desc: org?.desc,
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
