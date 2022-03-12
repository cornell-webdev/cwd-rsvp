import { FlexContainer, Spacer, Button } from 'cornell-glue-ui'
import React, { useState } from 'react'
import styled from 'styled-components'

const CreateMember = () => {
  const [name, setName] = useState<string>('')

  const handleCreateMember = () => {}

  return (
    <Container>
      <FlexContainer alignCenter>
        <StyledInput value={name} onChange={(event) => setName(event.target.value)} />
        <Spacer x={0.5} />
        <Button onClick={handleCreateMember}>Create member</Button>
      </FlexContainer>
    </Container>
  )
}

const Container = styled.div``

const StyledInput = styled.input`
  border: 2px solid ${(props) => props.theme.border.default};
  border-radius: 8px;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
`

export default CreateMember
