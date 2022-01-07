import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { Button, Spacer, Text, theme } from 'cornell-glue-ui'
import React from 'react'
import { Link } from 'react-router-dom'
import PageContainer from 'src/components/layout/PageContainer'
import VerticalButtonsContainer from 'src/components/layout/VerticalButtonsContainer'
import styled from 'styled-components'
import LinkedUserList from './LinkedUserList'

const OrgAdmins = () => {
  return (
    <PageContainer>
      <Container>
        <Link to='/profile/my-orgs'>
          <Button
            variant='text'
            startIcon={<ChevronLeftIcon />}
            color={theme.text.default}
            defaultBackground={theme.grey[100]}>
            Back
          </Button>
        </Link>
        <Spacer y={1.5} />
        <Text variant='h4' fontWeight={700}>
          Manage administrators
        </Text>
        <Spacer y={1.125} />
        <Text variant='meta1'>
          Administrators are accounts that are linked to your organization. These accounts are
          allowed to post and edit events for your organization as well as manage personnel.
        </Text>
        <LinkedUserList />
        <VerticalButtonsContainer>
          <Link to='/profile/my-orgs'>
            <Button>Save changes</Button>
          </Link>
          <Spacer y={1.125} />
          <Link to='/profile/my-orgs'>
            <Button color={theme.text.default} background={theme.grey[100]}>
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
