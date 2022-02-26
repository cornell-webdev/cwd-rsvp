import { Button, FlexContainer, Spacer, Text, theme } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { useTicketsByEventId } from 'src/api/ticket'
import styled from 'styled-components'
import FilterInput from './FilterInput'
import StatLabel from './StatLabel'

interface ITicketSalesListProps {
  eventId: string
  ticketsTotalCount?: number
}

const TicketSalesList = ({ eventId, ticketsTotalCount }: ITicketSalesListProps) => {
  const { tickets } = useTicketsByEventId(eventId)
  const revenue = tickets?.reduce((prev, ticket) => prev + ticket?.pricePaid, 0)
  const [filterString, setFilterString] = useState<string>('')

  return (
    <Container>
      <div>
        <Revenue>${revenue?.toFixed(2)}</Revenue>
        <Label>revenue</Label>
      </div>
      {tickets && ticketsTotalCount && (
        <StatLabel primaryCount={tickets.length} secondaryCount={ticketsTotalCount} label='sold' />
      )}
      <Spacer y={2} />
      <FilterInput
        placeholder='Name'
        value={filterString}
        onChange={(event) => setFilterString(event.target.value)}
      />
      <Spacer y={1} />
      {tickets
        ?.filter((ticket) => ticket?.name?.toLowerCase()?.includes(filterString?.toLowerCase()))
        ?.map((ticket) => (
          <TicketItem key={ticket?._id} alignCenter justifySpaceBetween>
            <div>
              <Text variant='meta1'>{ticket?.name}</Text>
              {ticket?.seller && <Text variant='meta1'>sold by {ticket?.seller?.fullName}</Text>}
            </div>
            <Text variant='meta1' fontWeight={700} color={theme.success[500]}>
              ${ticket?.pricePaid.toFixed(2)}
            </Text>
          </TicketItem>
        ))}
      <Spacer y={1} />
      <Button variant='text' size='small'>
        Show more
      </Button>
    </Container>
  )
}

const Container = styled.div``

const Revenue = styled.span`
  font-size: 1.7rem;
  color: ${(props) => props.theme.success[500]};
`

const Label = styled.span`
  font-size: 1rem;
  color: ${(props) => props.theme.text.muted};
  font-weight: 300;
  margin-left: 0.75rem;
`

const TicketItem = styled(FlexContainer)`
  padding: 0.75rem 0.2rem;
`

export default TicketSalesList
