import React from 'react'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'

const CheckIn = () => {
  const router = useRouter()
  const ticketId = router.match.params.ticketId
  return <Container>{ticketId}</Container>
}

const Container = styled.div``

export default CheckIn
