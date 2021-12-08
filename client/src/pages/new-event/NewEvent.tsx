import { Button, FlexContainer, Spacer, Text } from 'cornell-glue-ui'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useAllTags } from 'src/api/tag'
import { HookedDatePicker } from 'src/components/form-elements/DatePicker'
import { HookedInput } from 'src/components/form-elements/Input'
import { HookedSelect } from 'src/components/form-elements/Select'
import { HookedTextarea } from 'src/components/form-elements/Textarea'
import styled from 'styled-components'
import DateAndTime from './DateAndTime'

const NewEvent = () => {
  const form = useForm()
  const onSubmit = (data: any) => console.log(data)
  const { tags } = useAllTags()

  return (
    <Container>
      <Text variant='h4' fontWeight={700}>
        Create event
      </Text>
      <Spacer y='1.125rem' />
      <FormProvider {...form}>
        <StyledForm onSubmit={form.handleSubmit(onSubmit)}>
          <Text fontWeight={700}>Basic information</Text>
          <StyledInput label='Event title' placeholder='The name of your event' name='title' />
          <StyledInput
            label='Location'
            placeholder='Physical location or meeting URL'
            name='location'
          />
          <HookedSelect
            name='tagId'
            label='Event type'
            placeholder='Choose type'
            width='200px'
            options={tags?.map((tag) => ({
              label: tag?.name,
              value: tag?._id,
            }))}
          />
          <HookedSelect
            name='orgId'
            label='Organization'
            placeholder='Choose organization'
            width='300px'
            // TODO: show current user's linked orgs
            options={[
              {
                label: 'Language Expansion Program',
                value: '619833239e3bd68229eb63cb',
              },
            ]}
          />
          <Link to='/new-org'>
            <Button variant='text'>Create organization</Button>
          </Link>
          <Spacer y={0.5} />
          <HookedTextarea
            name='details'
            label='Event details'
            placeholder="What's this event about?"
          />
          <Text fontWeight={700}>Date and time</Text>
          <DateAndTime />
          <Text fontWeight={700}>Thumbnail image</Text>
          <Button type='submit'>Publish</Button>
        </StyledForm>
      </FormProvider>
    </Container>
  )
}

const Container = styled.div`
  padding: 0.75rem;
`

const StyledForm = styled.form`
  & > * {
    margin-bottom: 0.75rem;
  }
`

const StyledInput = styled(HookedInput)`
  width: 85%;
`

export default NewEvent
