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
  return <Container>{error}</Container>
}

const Container = styled.div``

export default ErrorMsg
