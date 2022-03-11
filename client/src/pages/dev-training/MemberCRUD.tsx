import { Button, FlexContainer, Spacer, Text } from 'cornell-glue-ui'
import React, { useState, useEffect } from 'react'

import { useMemberByName } from 'src/api/member'

import styled from 'styled-components'

const MemberCRUD = () => {
  const [createName, setCreateName] = useState<string>('')
  const [readName, setReadName] = useState<string>('')
  const [updateName, setUpdateName] = useState<string>()

  const { member } = useMemberByName(readName)

  useEffect(() => {
    if (member && !updateName) {
      setUpdateName(member?.name)
    }
  }, [member])

  const handleCreateMember = () => {}

  const handleReadMember = () => {}

  const handleUpdateMember = () => {}

  return (
    <Container>
      <FlexContainer alignCenter>
        <StyledInput value={createName} onChange={(event) => setCreateName(event.target.value)} />
        <Spacer x={0.5} />
        <Button onClick={handleCreateMember}>Create member</Button>
      </FlexContainer>
      <FlexContainer alignCenter>
        <StyledInput value={readName} onChange={(event) => setReadName(event.target.value)} />
        <Spacer x={0.5} />
        <Button onClick={handleReadMember}>Read member</Button>
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
          <Button>Delete member</Button>
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
