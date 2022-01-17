import { Spacer, Text } from 'cornell-glue-ui'
import React from 'react'
import { useMyEvents } from 'src/api/event'
import EmptyState from 'src/components/EmptyState'
import PageContainer from 'src/components/layout/PageContainer'
import MyEventCard from './MyEventCard'
import { ReactComponent as EmptyStateIllust } from 'src/assets/svgs/my-events-empty-state.svg'

const MyEvents = () => {
  const { myEvents } = useMyEvents()

  return (
    <PageContainer isMobileOnly>
      <Text variant='h4' fontWeight={700}>
        My events
      </Text>
      <Spacer y={0.75} />
      {myEvents && myEvents?.length > 0 ? (
        myEvents?.map((event) => <MyEventCard key={event?._id} event={event} />)
      ) : (
        <EmptyState
          illustration={<EmptyStateIllust />}
          text1='You don’t have any created events at this moment.'
          text2='Start posting event for your organization with RSVP!'
        />
      )}
    </PageContainer>
  )
}

export default MyEvents
