import { Button, FlexContainer, Spacer, Text } from 'cornell-glue-ui'
import React, { useEffect, useState } from 'react'
import { useDeleteMember, useMemberByName, useUpdateMember } from 'src/api/member'
import styled from 'styled-components'
import CreateMember from './CreateMember'

const MemberCRUD = () => {
  const [readName, setReadName] = useState<string>('')
  const [updateName, setUpdateName] = useState<string>()

  const { member } = useMemberByName(readName)
  const { updateMemberAsync } = useUpdateMember(readName)
  const { deleteMemberAsync } = useDeleteMember()

  useEffect(() => {
    if (member && !updateName) {
      setUpdateName(member?.name)
    }
  }, [member])

  const handleUpdateMember = () => {
    if (updateName) {
      updateMemberAsync({ name: updateName })
    }
  }

  const handleDeleteMember = () => {
    if (member?.name) {
      deleteMemberAsync({ name: member?.name })
    }
  }

  return (
    <Container>
      <CreateMember />
      <FlexContainer alignCenter>
        <StyledInput
          value={readName}
          onChange={(event) => setReadName(event.target.value)}
          placeholder='Member name'
        />
      </FlexContainer>
      {member && (
        <ReadResults>
          <Text variant='h5'>{member?.name}</Text>
          <FlexContainer alignCenter>
            <StyledInput
              value={updateName}
              onChange={(event) => setUpdateName(event.target.value)}
            />
            <Spacer x={0.5} />
            <Button onClick={handleUpdateMember}>Update member name</Button>
          </FlexContainer>
          <Spacer y={1} />
          <Button onClick={handleDeleteMember}>Delete member</Button>
        </ReadResults>
      )}
    </Container>
  )
}

const Container = styled.div`
  & > * {
    margin-bottom: 1rem;
  }
`

const StyledInput = styled.input`
  border: 2px solid ${(props) => props.theme.border.default};
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
`

const ReadResults = styled.div`
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid ${(props) => props.theme.border.default};
  width: fit-content;
`

export default MemberCRUD
