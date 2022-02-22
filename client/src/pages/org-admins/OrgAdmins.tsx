import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Button, Spacer, Text, theme } from 'cornell-glue-ui'
import React from 'react'
import { Link } from 'react-router-dom'
import BackButton from 'src/components/BackButton'
import PageContainer from 'src/components/layout/PageContainer'
import VerticalButtonsContainer from 'src/components/layout/VerticalButtonsContainer'
import styled from 'styled-components'
import LinkedUserList from './LinkedUserList'

const OrgAdmins = () => {
  return (
    <PageContainer isMobileOnly>
      <Container>
        <Link to='/profile/my-orgs'>
          <BackButton />
        </Link>
        <Spacer y={0.75} />
        <Text variant='h4' fontWeight={700}>
          Manage administrators
        </Text>
        <Spacer y={0.5625} />
        <Text variant='meta1'>
          Administrators are accounts that are linked to your organization. These accounts are
          allowed to post and edit events for your organization as well as manage personnel.
        </Text>
        <LinkedUserList />
        <VerticalButtonsContainer>
          <Link to='/profile/my-orgs'>
            <Button>Save changes</Button>
          </Link>
          <Spacer y={0.5625} />
          <Link to='/profile/my-orgs'>
            <Button
              color={theme.text.default}
              background={theme.grey[100]}
              hoverBackground={theme.grey[200]}>
              Cancel
            </Button>
          </Link>
        </VerticalButtonsContainer>
      </Container>
    </PageContainer>
  )
}

const Container = styled.div``

export default OrgAdmins
