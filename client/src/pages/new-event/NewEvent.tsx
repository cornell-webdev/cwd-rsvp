import { Spacer, Text } from 'cornell-glue-ui'
import React from 'react'
import EventForm from 'src/components/forms/EventForm'
import PageContainer from 'src/components/layout/PageContainer'

const NewEvent = () => {
  return (
    <PageContainer isMobileOnly isShowWarning={false}>
      <Text variant='h4' fontWeight={700}>
        Create event
      </Text>
      <Spacer y='1.125rem' />
      <EventForm />
    </PageContainer>
  )
}

export default NewEvent
