import { Spacer, Text } from 'cornell-glue-ui'
import React from 'react'
import { Link } from 'react-router-dom'
import BackButton from 'src/components/BackButton'
import OrgForm from 'src/components/forms/OrgForm'
import PageContainer from 'src/components/layout/PageContainer'
import styled from 'styled-components'

const NewOrg = () => {
  return (
    <PageContainer isMobileOnly isShowWarning={false}>
      <Container>
        <Link to='/profile/my-orgs'>
          <BackButton />
        </Link>
        <Spacer y={0.75} />
        <Text variant='h4' fontWeight={700}>
          Create organization
        </Text>
        <OrgForm />
      </Container>
    </PageContainer>
  )
}

const Container = styled.div``

export default NewOrg
