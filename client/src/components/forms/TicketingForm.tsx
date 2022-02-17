import { Button, FlexContainer, Text, theme } from 'cornell-glue-ui'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import styled from 'styled-components'
import RSVPInput from '../form-elements/RSVPInput'
import { HookedTextarea } from '../form-elements/Textarea'
import FormSectionContainer from './FormSectionContainer'
import DeleteIcon from '@material-ui/icons/Delete'

const TicketingForm = () => {
  const { watch, setValue } = useFormContext()

  const org = watch('org')
  const isTicketed = watch('isTicketed')

  if (org?.label !== 'LOKO') return null

  return (
    <FormSectionContainer>
      <FlexContainer justifySpaceBetween>
        <Text fontWeight={700}>Ticketing</Text>
        {isTicketed && (
          <Button
            type='button'
            variant='text'
            size='small'
            startIcon={<DeleteIcon />}
            onClick={() => setValue('isTicketed', false)}>
            Remove ticketing
          </Button>
        )}
        {/* TODO: disable button + show why it's disabled if at least 1 ticket has been sold */}
      </FlexContainer>
      {isTicketed ? (
        <>
          <div>
            <RSVPInput label='Event host Venmo ID' name='venmoId' placeholder='@venmo-id' />
            <Text variant='meta1' color={theme.text.muted}>
              All ticket revenue will be sent to this Venmo account 1 day after the event ends.
            </Text>
          </div>
          <RSVPInput label='Total number of tickets' name='totalTicketCount' />
          <RSVPInput label='Price per ticket (USD)' name='price' />
          {/* TODO: early bird pricing feature */}
          <div>
            <HookedTextarea
              name='checkInInstructions'
              label='Check-in instructions'
              placeholder='Please come to the front door of the venue. We will have a booth set up, where you can check in to the event ...'
              minRows={5}
            />
            <Text variant='meta1' color={theme.text.muted}>
              Detailed check-in instructions will help participants find and check-in to the event.
            </Text>
          </div>
        </>
      ) : (
        <Button variant='text' size='small' onClick={() => setValue('isTicketed', true)}>
          Sell tickets
        </Button>
      )}
    </FormSectionContainer>
  )
}

export default TicketingForm
