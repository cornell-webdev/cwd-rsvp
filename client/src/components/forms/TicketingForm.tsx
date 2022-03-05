import DeleteIcon from '@mui/icons-material/Delete'
import { Button, FlexContainer, Spacer, Text, theme } from 'cornell-glue-ui'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useHasSoldTicket } from 'src/api/ticket'
import useRouter from 'src/hooks/useRouter'
import DatePicker from '../form-elements/DatePicker'
import Label from '../form-elements/Label'
import RSVPInput from '../form-elements/RSVPInput'
import { HookedTextarea } from '../form-elements/Textarea'
import FormSectionContainer from './FormSectionContainer'

const TicketingForm = () => {
  const { watch, setValue } = useFormContext()
  const org = watch('org')
  const isEarlyPrice = watch('isEarlyPrice')
  const earlyDeadline = watch('earlyDeadline')
  const isTicketed = watch('isTicketed')
  const router = useRouter()
  const { hasSoldTicket } = useHasSoldTicket(router.match?.params?.eventId)

  const handleChangeDate = (date: Date) => {
    setValue('earlyDeadline', date)
  }

  if (org?.label !== 'LOKO') return null

  return (
    <FormSectionContainer>
      <FlexContainer justifySpaceBetween fullWidth>
        <Text fontWeight={700}>Ticketing</Text>
        <div>
          {isTicketed && (
            <Button
              type='button'
              variant='text'
              size='small'
              startIcon={<DeleteIcon />}
              disabled={hasSoldTicket}
              onClick={() => setValue('isTicketed', false)}>
              Remove ticketing
            </Button>
          )}
        </div>
      </FlexContainer>
      {hasSoldTicket && (
        <div>
          <Text variant='meta1' color={theme.text.muted}>
            Can't remove ticketing after a ticket has been sold
          </Text>
          <Spacer y={1} />
        </div>
      )}
      {isTicketed ? (
        <>
          <div>
            <RSVPInput label='Event host Venmo ID' name='venmoId' placeholder='@venmo-id' />
            <Text variant='meta1' color={theme.text.muted}>
              All ticket revenue will be sent to this Venmo account within 3 business days after the
              event ends.
            </Text>
          </div>
          <RSVPInput label='Total number of tickets' name='totalTicketCount' />
          <div>
            <RSVPInput label='Price per ticket (USD)' name='price' disabled={hasSoldTicket} />
            {hasSoldTicket && (
              <Text variant='meta1' color={theme.text.muted}>
                Can't change price after a ticket has been sold
              </Text>
            )}
          </div>
          {isEarlyPrice ? (
            <div>
              <RSVPInput
                label='Early bird price (USD)'
                name='earlyPrice'
                disabled={hasSoldTicket}
              />
              {hasSoldTicket && (
                <Text variant='meta1' color={theme.text.muted}>
                  Can't change price after a ticket has been sold
                </Text>
              )}
              <Spacer y={1} />
              <Label>Early bird deadline</Label>
              <Spacer y={0.3} />
              <DatePicker date={new Date(earlyDeadline)} onChange={handleChangeDate} />
              <Spacer y={0.3} />
              <Text variant='meta1' color={theme.text.muted}>
                Tickets purchased before the early bird deadline will cost the early bird price.
              </Text>
              <Spacer y={1} />
              <Button
                variant='text'
                size='small'
                onClick={() => setValue('isEarlyPrice', false)}
                color={theme.grey[700]}
                background={theme.grey[50]}
                hoverBackground={theme.grey[100]}
                startIcon={<DeleteIcon />}>
                Remove early bird price
              </Button>
            </div>
          ) : (
            <Button
              variant='text'
              size='small'
              onClick={() => setValue('isEarlyPrice', true)}
              disabled={hasSoldTicket}>
              Add early bird price
            </Button>
          )}
          <Spacer y={1.5} />
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
