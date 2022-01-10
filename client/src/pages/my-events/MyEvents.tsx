import { Spacer, Text } from 'cornell-glue-ui'
import React from 'react'
import { useMyEvents } from 'src/api/event'
import PageContainer from 'src/components/layout/PageContainer'
import MyEventCard from './MyEventCard'

const MyEvents = () => {
  const { myEvents } = useMyEvents()

  return (
    <PageContainer isMobileOnly>
      <Text variant='h4' fontWeight={700}>
        My events
      </Text>
      <Spacer y={1.5} />
      {myEvents?.map((event) => (
        <MyEventCard key={event?._id} event={event} />
      ))}
    </PageContainer>
  )
}

export default MyEvents
