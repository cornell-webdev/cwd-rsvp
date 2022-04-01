import { Button, FlexContainer, Spacer, Text, theme } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { useCheckinTicket, useTicketsByEventId } from 'src/api/ticket'
import styled from 'styled-components'
import { useDebounce } from 'use-debounce'
import FilterInput from './FilterInput'
import StatLabel from './StatLabel'
import LoadingDots from 'src/components/LoadingDots'

interface IParticipantListProps {
  eventId: string
}

const ParticipantList = ({ eventId }: IParticipantListProps) => {
  const [count, setCount] = useState<number>(5)
  const [filterString, setFilterString] = useState<string>('')
  const [debouncedFilterString] = useDebounce(filterString, 1000)
  const { tickets, soldCount, checkinCount, refetch, isLoading } = useTicketsByEventId(
    eventId,
    count,
    debouncedFilterString
  )
  const { checkinTicketAsync } = useCheckinTicket()
  const handleCheckin = async (ticketId: string) => {
    await checkinTicketAsync({ ticketId })
    refetch()
  }

  if (isLoading) {
    return <LoadingDots />
  }

  return (
    <Container>
      {tickets && (
        <StatLabel
          primaryCount={Number(checkinCount)}
          secondaryCount={Number(soldCount)}
          label='checked-in'
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
              <Text variant='meta2' color={theme.text.muted}>
                {ticket?.email}
              </Text>
            </div>
            {ticket?.isCheckedIn ? (
              <Text variant='meta1' color={theme.success[500]}>
                Checked-in
              </Text>
            ) : (
              <Button variant='text' size='small' onClick={() => handleCheckin(ticket?._id)}>
                Check-in
              </Button>
            )}
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

const TicketItem = styled(FlexContainer)`
  padding: 0.75rem 0.2rem;
`

export default ParticipantList
