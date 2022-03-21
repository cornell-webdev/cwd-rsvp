import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined'
import LocationIcon from '@mui/icons-material/LocationOnOutlined'
import { FlexContainer, Spacer, Text, theme } from 'cornell-glue-ui'
import { useSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useEventById } from 'src/api/event'
import { useEventSeller, useSellerById } from 'src/api/seller'
import { useCreateTicket, useTicketsByEventId } from 'src/api/ticket'
import { useCurrentUser } from 'src/api/user'
import BackButton from 'src/components/BackButton'
import Input from 'src/components/form-elements/Input'
import Select, { ISelectOption } from 'src/components/form-elements/Select'
import PageContainer from 'src/components/layout/PageContainer'
import useRouter from 'src/hooks/useRouter'
import { getEventDate, getEventTime } from 'src/util/date'
import getTicketPrice from 'src/util/getTicketPrice'
import styled from 'styled-components'
import Paypal from './Paypal'

const BuyTicket = () => {
  const router = useRouter()
  const eventId = router.match.params.eventId
  const { event } = useEventById(eventId)
  const { createTicketAsync } = useCreateTicket()
  const { currentUser } = useCurrentUser()
  const [name, setName] = useState<string>(currentUser?.name || '')
  const [email, setEmail] = useState<string>(currentUser?.email || '')
  const [seller, setSeller] = useState<ISelectOption>()
  const { sellers } = useEventSeller(eventId)
  const { seller: querySeller } = useSellerById(router.query?.sellerId)
  const { soldCount } = useTicketsByEventId(eventId, 0, '')
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (currentUser && !name && !email) {
      setName(currentUser?.name)
      setEmail(currentUser?.email)
    }
  }, [currentUser])

  useEffect(() => {
    if (querySeller) {
      setSeller({
        label: querySeller?.fullName,
        value: querySeller?._id,
      })
    }
  }, [querySeller])

  const sellerOptions = sellers?.map((seller) => ({
    label: seller?.fullName,
    value: seller?._id,
  }))

  const handlePayment = async (orderData: any) => {
    const paypalOrderId = orderData?.purchase_units[0]?.payments?.captures[0]?.id
    const paypalAmountPaid = orderData?.purchase_units[0]?.payments?.captures[0]?.amount?.value

    await createTicketAsync({
      eventId,
      sellerId: seller?.value,
      name,
      email,
      pricePaid: paypalAmountPaid,
      providerId: paypalOrderId,
      providerData: orderData,
    })
    enqueueSnackbar('Ticket purchase successful!', {
      variant: 'success',
      preventDuplicate: true,
    })
    router.push('/profile/my-tickets')
  }

  if (!event) return null

  if (Number(soldCount) >= Number(event?.totalTicketCount)) {
    enqueueSnackbar('Tickets have been sold out', {
      variant: 'error',
      preventDuplicate: true,
    })
    return <Redirect to={`/event/${eventId}`} />
  }

  return (
    <PageContainer isMobileOnly>
      <Spacer y={2} />
      <Link to={`/event/${eventId}${router.location.search}`}>
        <BackButton />
      </Link>
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
      <Select
        label='Seller'
        options={sellerOptions}
        value={seller}
        disabled={!!querySeller}
        onChange={(newOption: ISelectOption) => setSeller(newOption)}
      />
      <Spacer y={1} />
      <InfoTextContainer>
        <Text variant='meta1' color={theme.text.muted}>
          Please select the seller who convinced you to buy this ticket. The seller will be given
          credit for this ticket sale.
        </Text>
      </InfoTextContainer>
      <PriceBreakdownContainer>
        <PriceSection>
          <FlexContainer justifySpaceBetween>
            <Text variant='meta1' color={theme.text.muted}>
              Ticket 1x
            </Text>
            <Text variant='meta1' color={theme.text.muted}>
              ${getTicketPrice(event)}
            </Text>
          </FlexContainer>
          <Spacer y={0.5} />
          <FlexContainer justifySpaceBetween>
            <Text variant='meta1' color={theme.text.muted}>
              Fees & tax
            </Text>
            <Text variant='meta1' color={theme.text.muted}>
              $0
            </Text>
          </FlexContainer>
        </PriceSection>
        <PriceSection>
          <FlexContainer justifySpaceBetween>
            <Text fontWeight={700}>Total</Text>
            <Text fontWeight={700}>${getTicketPrice(event)}</Text>
          </FlexContainer>
        </PriceSection>
      </PriceBreakdownContainer>
      <FlexContainer justifyCenter>
        <Text variant='meta2' color={theme.text.muted} textAlign='center'>
          By purchasing a ticket, you agree to the{' '}
          <StyledLink to='/terms-and-conditions' target='_blank' rel='noopener noreferrer'>
            Terms and Conditions
          </StyledLink>{' '}
          and{' '}
          <StyledLink to='/privacy-policy' target='_blank' rel='noopener noreferrer'>
            Privacy Policy
          </StyledLink>
          .
        </Text>
      </FlexContainer>
      <Spacer y={2} />
      <FlexContainer justifyCenter>
        {event && (
          <Paypal
            onPayment={(orderData) => handlePayment(orderData, name, email, seller?.value)}
            price={getTicketPrice(event)}
          />
        )}
      </FlexContainer>
    </PageContainer>
  )
}

const PriceBreakdownContainer = styled.div`
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.border.default};
  margin-top: 3rem;
  margin-bottom: 0.5rem;

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

const StyledLink = styled(Link)`
  text-decoration: underline;

  @media (min-width: ${(props) => props.theme.small}) {
    &:hover {
      text-decoration: underline;
    }
  }
`

export default BuyTicket
