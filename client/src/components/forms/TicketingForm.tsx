import React from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'

interface ITicketingFormProps {}

const TicketingForm = ({}: ITicketingFormProps) => {
  const { watch } = useFormContext()

  return <Container>TicketingForm</Container>
}

const Container = styled.div``

export default TicketingForm
