import React from 'react'
import theme from 'src/app/theme'
import Text from './Text'

const ErrorMsg = (props: { error?: string }) => {
  return (
    <>
      {props.error && <Text
        variant='h6'
        color={theme.danger[500]}
        fontWeight={500}
      >{props.error}</Text>}
    </>
  )
}

export default ErrorMsg
