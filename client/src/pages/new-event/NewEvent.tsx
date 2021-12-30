import { Button, Spacer, Text } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useAllTags } from 'src/api/tag'
import ImageUpload from 'src/components/form-elements/ImageUpload'
import { HookedInput } from 'src/components/form-elements/Input'
import { HookedSelect } from 'src/components/form-elements/Select'
import { HookedTextarea } from 'src/components/form-elements/Textarea'
import { IEventDate } from 'src/types/event.type'
import styled from 'styled-components'
import DateAndTime from './DateAndTime'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useCreateEvent } from 'src/api/event'
import useRouter from 'src/hooks/useRouter'

const NewEvent = () => {
  const schema = yup
    .object({
      title: yup.string().required(),
      location: yup.string().required(),
      tag: yup.object().required(),
      org: yup.object().required(),
      details: yup.string().required(),
    })
    .required()

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues:
      import.meta.env.VITE_NODE_ENV === 'development'
        ? {
            title: `test event ${Date.now().toString().slice(-4)}`,
            location: `test location ${Date.now().toString().slice(-4)}`,
            details: `test details ${Date.now().toString().slice(-4)}`,
          }
        : {},
  })
  const { tags } = useAllTags()

  const [urls, setUrls] = useState<string[]>([])
  const [dates, setDates] = useState<IEventDate[]>([
    {
      date: new Date(),
      startTime: '0000',
      endTime: '0000',
    },
  ])

  const { createEventAsync } = useCreateEvent()
  const router = useRouter()
  const onSubmit = async (formData: any) => {
    const data = {
      ...formData,
      imgs: urls,
      dates,
      tagId: formData.tag.value,
      orgId: formData.org.value,
    }

    delete data.tag
    delete data.org

    await createEventAsync(data)
    router.push('/profile/my-events')
  }

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
            name='tag'
            label='Event type'
            placeholder='Choose type'
            width='200px'
            options={tags?.map((tag) => ({
              label: tag?.name,
              value: tag?._id,
            }))}
          />
          <HookedSelect
            name='org'
            label='Organization'
            placeholder='Choose organization'
            width='300px'
            // TODO: show all orgs
            // TODO: searchable
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
            minRows={5}
          />
          <Text fontWeight={700}>Date and time</Text>
          <DateAndTime dates={dates} setDates={setDates} />
          <Text fontWeight={700}>Thumbnail image</Text>
          <ImageUpload urls={urls} setUrls={setUrls} maxImgs={1} />
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
