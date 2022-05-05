import { Button, FlexContainer, Spacer, Text, theme } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { useCheckinTicket, useTicketsByEventId, useTicketStatsByEventId } from 'src/api/ticket'
import styled from 'styled-components'
import { useDebounce } from 'use-debounce'
import FilterInput from './FilterInput'
import StatLabel from './StatLabel'
import LoadingDots from 'src/components/LoadingDots'
import RestartAltOutlinedIcon from '@mui/icons-material/RestartAltOutlined'
import Checkbox from 'src/components/form-elements/Checkbox'

interface IParticipantListProps {
  eventId: string
}

const ParticipantList = ({ eventId }: IParticipantListProps) => {
  const [isOnlyCheckedIn, setisOnlyCheckedIn] = useState<boolean>(false)
  const [count, setCount] = useState<number>(5)
  const [filterString, setFilterString] = useState<string>('')
  const [debouncedFilterString] = useDebounce(filterString, 1000)
  const {
    soldCount,
    checkinCount,
    refetch: refetchStats,
    isLoading,
  } = useTicketStatsByEventId(eventId)
  const { tickets, refetch: refetchTickets } = useTicketsByEventId({
    eventId,
    count: count.toString(),
    filterString: debouncedFilterString,
    isOnlyCheckedIn: isOnlyCheckedIn.toString(),
  })
  const { checkinTicketAsync } = useCheckinTicket()
  const handleCheckin = async (ticketId: string, isCheckedIn: boolean) => {
    await checkinTicketAsync({ ticketId, isCheckedIn: !isCheckedIn })
    refetchStats()
    refetchTickets()
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
      <CheckboxContainer>
        <Checkbox
          label='Only show checked-in'
          checked={isOnlyCheckedIn}
          onChange={() => setisOnlyCheckedIn(!isOnlyCheckedIn)}
        />
      </CheckboxContainer>
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
              <Button
                variant='text'
                size='small'
                onClick={() => handleCheckin(ticket?._id, ticket?.isCheckedIn)}
                background={theme.success[50]}
                color={theme.success[500]}
                startIcon={<RestartAltOutlinedIcon />}>
                Checked in
              </Button>
            ) : (
              <Button
                variant='text'
                size='small'
                onClick={() => handleCheckin(ticket?._id, ticket?.isCheckedIn)}>
                Check-in
              </Button>
            )}
          </TicketItem>
        ))}
      <Spacer y={1} />
      {soldCount && count < Number(soldCount) && (
        <Button variant='text' size='small' onClick={() => setCount(count + 10)}>
          Show more
        </Button>
      )}
    </Container>
  )
}

const Container = styled.div``

const TicketItem = styled(FlexContainer)`
  padding: 0.75rem 0.2rem;
`

const CheckboxContainer = styled.div`
  margin: 1rem 0;
  padding-left: 0.2rem;
`

export default ParticipantList
