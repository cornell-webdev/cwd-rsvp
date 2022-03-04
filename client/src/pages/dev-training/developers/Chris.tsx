import { Text } from 'cornell-glue-ui'
import React from 'react'
import styled from 'styled-components'

interface IChrisProps {}

const Chris = ({}: IChrisProps) => {
  return (
    <Container>
      <Text>Hi my name is Chris</Text>
    </Container>
  )
}

const Container = styled.div``

export default Chris
