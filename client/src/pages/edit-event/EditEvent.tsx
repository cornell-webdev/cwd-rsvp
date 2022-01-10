import { Spacer, Text } from 'cornell-glue-ui'
import React from 'react'
import { useEventById } from 'src/api/event'
import EventForm from 'src/components/forms/EventForm'
import PageContainer from 'src/components/layout/PageContainer'
import useRouter from 'src/hooks/useRouter'

const EditEvent = () => {
  const router = useRouter()
  const eventId = router.match.params.eventId
  const { event } = useEventById(eventId)

  return (
    <PageContainer isMobileOnly isShowWarning={false}>
      <Text variant='h4' fontWeight={700}>
        Edit event
      </Text>
      <Spacer y='1.125rem' />
      {event && <EventForm initValues={event} />}
    </PageContainer>
  )
}

export default EditEvent
