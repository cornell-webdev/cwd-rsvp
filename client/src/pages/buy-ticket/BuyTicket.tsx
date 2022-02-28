import { FlexContainer, Spacer, Text, theme } from 'cornell-glue-ui'
import React, { useState } from 'react'
import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined'
import LocationIcon from '@mui/icons-material/LocationOnOutlined'
import { useEventById } from 'src/api/event'
import { useCreateTicket } from 'src/api/ticket'
import { useCurrentUser } from 'src/api/user'
import BackButton from 'src/components/BackButton'
import PageContainer from 'src/components/layout/PageContainer'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'
import Paypal from './Paypal'
import { getEventDate, getEventTime } from 'src/util/date'
import * as yup from 'yup'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import Input from 'src/components/form-elements/Input'
import Select from 'src/components/form-elements/Select'

const BuyTicket = () => {
  const router = useRouter()
  const eventId = router.match.params.eventId
  const { event } = useEventById(eventId)
  const { createTicketAsync } = useCreateTicket()
  const { currentUser } = useCurrentUser()
  const [name, setName] = useState<string>(currentUser?.name || '')
  const [email, setEmail] = useState<string>(currentUser?.email || '')
  const [sellerId, setSellerId] = useState<string>(router.query?.sellerId)

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
    <PageContainer>
      <BackButton />
      <Spacer y={1} />
      <Text variant='h3'>{event?.title}</Text>
      <Spacer y={1} />
      <FlexContainer alignCenter>
        <StyledCalendarIcon />
        <Spacer x={0.5} />
        <Text>
          {getEventTime(event.dates[0].startTime)} - {getEventTime(event.dates[0].endTime)},{' '}
          {getEventDate(event.dates[0].date)}
        </Text>
      </FlexContainer>
      <Spacer y={0.5} />
      <FlexContainer alignCenter>
        <StyledLocationIcon />
        <Spacer x={0.5} />
        <Text>{event?.location}</Text>
      </FlexContainer>
      <Spacer y={2} />
      <Input label='Name' value={name} onChange={(event) => setName(event.target.value)} />
      <Spacer y={1} />
      <Input label='Email' value={email} onChange={(event) => setEmail(event.target.value)} />
      <Spacer y={0.5} />
      <InfoTextContainer>
        <Text variant='meta1' color={theme.text.muted}>
          Your email address will be shared with the event host to communicate any updates or
          changes to the event.
        </Text>
      </InfoTextContainer>
      <Spacer y={1} />
      <Select label='Seller' />
      <Spacer y={1} />
      <InfoTextContainer>
        <Text variant='meta1' color={theme.text.muted}>
          Please select the seller who convinced you to buy this ticket. The seller will be given
          credit for this ticket sale.
        </Text>
      </InfoTextContainer>
      <Spacer y={2} />
      <PriceBreakdownContainer>
        <PriceSection>
          <FlexContainer justifySpaceBetween>
            <Text variant='meta1' color={theme.text.muted}>
              Ticket 1x
            </Text>
            {/* TODO: conditionally get price (is it early price?) */}
            <Text variant='meta1' color={theme.text.muted}>
              ${event?.price}
            </Text>
          </FlexContainer>
          <Spacer y={0.5} />
          <FlexContainer justifySpaceBetween>
            <Text variant='meta1' color={theme.text.muted}>
              Fees & tax
            </Text>
            {/* TODO: conditionally get price (is it early price?) */}
            <Text variant='meta1' color={theme.text.muted}>
              $0
            </Text>
          </FlexContainer>
        </PriceSection>
        <PriceSection>
          <FlexContainer justifySpaceBetween>
            <Text fontWeight={700}>Total</Text>
            {/* TODO: conditionally get price (is it early price?) */}
            <Text fontWeight={700}>${event?.price}</Text>
          </FlexContainer>
        </PriceSection>
      </PriceBreakdownContainer>
      <Spacer y={0.5} />
      <FlexContainer justifyCenter>
        <Text variant='meta2' color={theme.text.muted} textAlign='center'>
          By purchasing a ticket, you agree to the terms and conditions.
        </Text>
      </FlexContainer>
      <Spacer y={2} />
      <FlexContainer justifyCenter>
        {event?.price && <Paypal onPayment={handlePayment} price={event.price} />}
      </FlexContainer>
    </PageContainer>
  )
}

const PriceBreakdownContainer = styled.div`
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.border.default};

  & > div:first-of-type {
    border-bottom: 1px solid ${(props) => props.theme.border.default};
  }
`

const PriceSection = styled.div`
  padding: 0.75rem 1rem;
`

const StyledCalendarIcon = styled(CalendarIcon)`
  fill: ${(props) => props.theme.text.default} !important;
`

const StyledLocationIcon = styled(LocationIcon)`
  fill: ${(props) => props.theme.text.default} !important;
`

const InfoTextContainer = styled.div`
  padding: 0 0.5rem;
`

export default BuyTicket
