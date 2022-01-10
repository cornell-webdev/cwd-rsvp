import { Button, FlexContainer, Spacer } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { useOrgAddLinkedUser, useOrgLinkedUsers } from 'src/api/org'
import ErrorMsg from 'src/components/form-elements/ErrorMsg'
import Input from 'src/components/form-elements/Input'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'
import LinkedUserItem from './LinkedUserItem'

const LinkedUserList = () => {
  const router = useRouter()
  const orgId = router.match.params.orgId
  const { orgLinkedUsers } = useOrgLinkedUsers(orgId)
  const [isAdding, setIsAdding] = useState<boolean>(false)
  const [newEmail, setNewEmail] = useState<string>('')
  const [error, setError] = useState<string>('')
  const { addLinkedUserAsync } = useOrgAddLinkedUser(orgId)

  const handleLinkNewEmail = async () => {
    try {
      await addLinkedUserAsync({
        email: newEmail,
      })
      setNewEmail('')
      setIsAdding(false)
      setError('')
    } catch (error) {
      setError(
        'Invalid email address. Please make sure the user has created an account on RSVP with this email address.'
      )
    }
  }

  return (
    <Container>
      {orgLinkedUsers?.linkedUsers?.map((user) => (
        <LinkedUserItem key={user?._id} user={user} orgId={orgId} />
      ))}
      <Spacer y={0.75} />
      {isAdding ? (
        <div>
          <FlexContainer alignCenter>
            <Input
              label='Email'
              value={newEmail}
              onChange={(e) => setNewEmail(e.currentTarget.value)}
            />
            <Spacer x={1} />
            <AddButton onClick={handleLinkNewEmail}>Add</AddButton>
          </FlexContainer>
          {error && <ErrorMsg error={error} />}
        </div>
      ) : (
        <Button variant='text' onClick={() => setIsAdding(true)}>
          Add another linked account
        </Button>
      )}
    </Container>
  )
}

const Container = styled.div`
  margin-top: 0.75rem;
  margin-bottom: 1.875rem;
`

const AddButton = styled(Button)`
  margin-top: 1.2rem;
`

export default LinkedUserList
