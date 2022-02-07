import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Spacer, Text, theme } from 'cornell-glue-ui'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useCreateOrg, useUpdateOrgById } from 'src/api/org'
import { useCurrentUser } from 'src/api/user'
import useRouter from 'src/hooks/useRouter'
import styled from 'styled-components'
import * as yup from 'yup'
import ImageUpload from '../form-elements/ImageUpload'
import { HookedInput } from '../form-elements/Input'
import { HookedTextarea } from '../form-elements/Textarea'
import VerticalButtonsContainer from '../layout/VerticalButtonsContainer'

interface IOrgFormInitValues {
  _id?: string
  name?: string
  desc?: string
  website?: string
  avatar?: string
}

interface IOrgFormProps {
  initValues?: IOrgFormInitValues
}

const OrgForm = ({ initValues = {} }: IOrgFormProps) => {
  const [urls, setUrls] = useState<string[]>(initValues?.avatar ? [initValues.avatar] : [])

  const schema = yup
    .object({
      name: yup.string().required(),
      desc: yup.string().required(),
      website: yup.string().required(),
    })
    .required()

  const form = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
    reValidateMode: 'onBlur',
    defaultValues: initValues,
  })

  const { createOrgAsync } = useCreateOrg()
  const router = useRouter()
  const { currentUser } = useCurrentUser()
  const { updateOrgAsync } = useUpdateOrgById(initValues?._id || '')

  const onSubmit = async (formData: any) => {
    const data = {
      ...formData,
    }

    if (urls?.length > 0) {
      data.avatar = urls[0]
    }

    if (initValues?._id) {
      await updateOrgAsync(data)
    } else {
      await createOrgAsync({ ...data, linkedUserIds: [currentUser?._id] })
    }

    router.push('/profile/my-orgs')
  }

  return (
    <Container>
      <FormProvider {...form}>
        <StyledForm onSubmit={form.handleSubmit(onSubmit)}>
          <Spacer y={0.375} />
          <Text fontWeight={700}>Basic information</Text>
          <StyledInput name='name' label='Organization name' />
          <StyledInput name='website' label='Website' />
          <HookedTextarea name='desc' label='Organization description' minRows={5} />
          <Text fontWeight={700}>Profile image</Text>
          {/* TODO: hooked image upload */}
          <ImageUpload urls={urls} setUrls={setUrls} maxImgs={1} />
          <VerticalButtonsContainer>
            <Button type='submit'>Save changes</Button>
            <Spacer y={0.5625} />
            <Button
              color={theme.text.default}
              background={theme.grey[100]}
              hoverBackground={theme.grey[200]}
              onClick={() => router.history.goBack()}>
              Cancel
            </Button>
          </VerticalButtonsContainer>
        </StyledForm>
      </FormProvider>
    </Container>
  )
}

const Container = styled.div``

const StyledForm = styled.form`
  & > * {
    margin-bottom: 0.75rem;
  }
`

const StyledInput = styled(HookedInput)`
  width: 85%;
`

export default OrgForm
