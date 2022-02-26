import { Button, FlexContainer, Spacer, Text, theme } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { useTicketsByEventId } from 'src/api/ticket'
import { formatDate, getEventTime } from 'src/util/date'
import styled from 'styled-components'
import FilterInput from './FilterInput'
import StatLabel from './StatLabel'

interface ITicketSalesListProps {
  eventId: string
  ticketsTotalCount?: number
}

const TicketSalesList = ({ eventId, ticketsTotalCount }: ITicketSalesListProps) => {
  const [count, setCount] = useState<number>(3)
  const { tickets, revenue, soldCount } = useTicketsByEventId(eventId, count)
  const [filterString, setFilterString] = useState<string>('')

  return (
    <Container>
      <div>
        <Revenue>${Number(revenue)?.toFixed(2)}</Revenue>
        <Label>revenue</Label>
      </div>
      {tickets && ticketsTotalCount && (
        <StatLabel
          primaryCount={Number(soldCount)}
          secondaryCount={ticketsTotalCount}
          label='sold'
        />
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
          <TicketItem key={ticket?._id} alignStart justifySpaceBetween>
            <div>
              <Text variant='meta1'>{ticket?.name}</Text>
              {ticket?.seller && <Text variant='meta1'>sold by {ticket?.seller?.fullName}</Text>}
            </div>
            <FlexContainer flexDirection='column' alignCenter>
              <Text variant='meta1'>{formatDate(ticket?.createdAt)}</Text>
              <Text variant='meta1' color={theme.text.muted}>
                {getEventTime(ticket?.createdAt?.toString())}
              </Text>
            </FlexContainer>
            <Text variant='meta1' fontWeight={700} color={theme.success[500]}>
              ${ticket?.pricePaid.toFixed(2)}
            </Text>
          </TicketItem>
        ))}
      <Spacer y={1} />
      <Button variant='text' size='small' onClick={() => setCount(count + 10)}>
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
