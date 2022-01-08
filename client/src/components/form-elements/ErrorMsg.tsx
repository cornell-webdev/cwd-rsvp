import { Text, theme } from 'cornell-glue-ui'
import React from 'react'
import styled from 'styled-components'

interface IErrorMsgProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  error?: string
}

const ErrorMsg = ({ error }: IErrorMsgProps) => {
  return (
    <Container>
      <Text variant='meta1' color={theme.text.error}>
        {error}
      </Text>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 0.2rem;
`

export default ErrorMsg
