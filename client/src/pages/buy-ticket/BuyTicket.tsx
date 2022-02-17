import { Text } from 'cornell-glue-ui'
import React from 'react'
import { useEventById } from 'src/api/event'
import { useCreateTicket } from 'src/api/ticket'
import { useCurrentUser } from 'src/api/user'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'
import Paypal from './Paypal'

const BuyTicket = () => {
  const router = useRouter()
  const eventId = router.match.params.eventId
  const { event } = useEventById(eventId)
  const { createTicketAsync } = useCreateTicket()
  const { currentUser } = useCurrentUser()

  const handlePayment = async (orderData: any) => {
    console.log('handle payment: ', orderData)
    const paypalOrderId = orderData?.purchase_units[0]?.payments?.captures[0]?.id
    const paypalAmountPaid = orderData?.purchase_units[0]?.payments?.captures[0]?.amount?.value
    console.log('paypalOrderId', paypalOrderId)
    console.log('paypalAmountPaid', paypalAmountPaid)
    const ticket = await createTicketAsync({
      eventId,
      // TODO: sellerId
      name: currentUser?.name,
      email: currentUser?.email,
      pricePaid: paypalAmountPaid,
      providerId: paypalOrderId,
      providerData: orderData,
    })
    console.log('ticket', ticket)
    router.push('/profile/my-tickets')
  }

  if (!event) return null

  return (
    <Container>
      <Text>{event?.title}</Text>
      <Text>{event?.isTicketed ? 'ticketed' : 'not ticketed'}</Text>
      <Text>${event?.price}</Text>
      {event?.price && <Paypal onPayment={handlePayment} price={event.price} />}
    </Container>
  )
}

const Container = styled.div``

export default BuyTicket
