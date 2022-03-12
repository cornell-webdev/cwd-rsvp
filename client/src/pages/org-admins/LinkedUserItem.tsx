import { FlexContainer, IconButton, Spacer, Text, theme } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { IUser } from 'src/types/user.type'
import styled from 'styled-components'
import LinkIcon from '@mui/icons-material/Link'
import { useCurrentUser } from 'src/api/user'
import DeleteIcon from '@mui/icons-material/Delete'
import ConfirmationModal from 'src/components/layout/ConfirmationModal'
import { useOrgRemoveLinkedUser } from 'src/api/org'

interface ILinkedUserItemProps {
  user: IUser
  orgId: string
}

const LinkedUserItem = ({ user, orgId }: ILinkedUserItemProps) => {
  const { currentUser } = useCurrentUser()
  const isCurrentUser = user?.email != null && currentUser?.email === user?.email
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const { removeLinkedUserAsync } = useOrgRemoveLinkedUser(orgId)

  const removeLink = () => {
    removeLinkedUserAsync({
      email: user?.email,
    })
  }

  return (
    <>
      <Container>
        <FlexContainer alignCenter>
          <EmailContainer isCurrentUser={isCurrentUser}>
            <FlexContainer alignCenter>
              <StyledLinkIcon />
              <Text>{user?.email}</Text>
            </FlexContainer>
            {/* {isCurrentUser && (
              <Text variant='meta2' color={theme.text.light} fontWeight={700}>
                you
              </Text>
            )} */}
          </EmailContainer>
          <Spacer x={1.25} />
          <IconButton icon={<DeleteIcon />} onClick={() => setIsModalOpen(true)} />
        </FlexContainer>
      </Container>
      <ConfirmationModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onConfirm={removeLink}
        heading={isCurrentUser ? 'Remove yourself from organization' : 'Remove administrator'}
        body={
          isCurrentUser
            ? 'You will lose access to some features'
            : 'This account will lose access to some features'
        }
        confirmationText='Remove'
      />
    </>
  )
}

const Container = styled.div`
  margin-bottom: 0.5rem;
`

interface IEmailContainerProps {
  isCurrentUser: boolean
}

const EmailContainer = styled.div<IEmailContainerProps>`
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${(props) => props.theme.grey[100]};
  padding: 0.3rem 0.5rem;
  flex-grow: 2;

  /* isCurrentUser */
  background: ${(props) => props.isCurrentUser && props.theme.brand[50]};
`

const StyledLinkIcon = styled(LinkIcon)`
  margin-right: 0.6rem;
  height: 30px;
  width: 30px;
`

export default LinkedUserItem
