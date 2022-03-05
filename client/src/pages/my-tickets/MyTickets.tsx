import { Spacer, Text } from 'cornell-glue-ui'
import React from 'react'
import { useMyTickets } from 'src/api/ticket'
import { ReactComponent as EmptyStateIllust } from 'src/assets/svgs/my-events-empty-state.svg'
import EmptyState from 'src/components/EmptyState'
import PageContainer from 'src/components/layout/PageContainer'
import TicketItem from './TicketItem'

const MyTickets = () => {
  const { myTickets } = useMyTickets()

  return (
    <PageContainer isMobileOnly>
      <Text variant='h4' fontWeight={700}>
        My tickets
      </Text>
      <Spacer y={0.75} />
      {myTickets && myTickets?.length > 0 ? (
        myTickets?.map((ticket) => <TicketItem key={ticket?._id} ticket={ticket} />)
      ) : (
        <EmptyState
          illustration={<EmptyStateIllust />}
          text1="You haven't bought any tickets yet"
          text2='Get started by buying an event ticket!'
        />
      )}
    </PageContainer>
  )
}

export default MyTickets
