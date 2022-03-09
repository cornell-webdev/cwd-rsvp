import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { IEvent } from 'src/types/event.type'

export const memberByNameQueryConfig = (name: string) => ({
  url: ``,
})

export const useMemberByName = (name: string) => {
  const { data: member, ...rest } = useCustomQuery<any>(memberByNameQueryConfig(name))

  return {
    ...rest,
    member,
  }
}

export const useCreateMember = () => {
  const {
    mutate: createMember,
    mutateAsync: createMemberAsync,
    ...rest
  } = useCustomMutation<any, any>({
    url: '',
    method: 'post',
  })

  return {
    ...rest,
    createMember,
    createMemberAsync,
  }
}

export const useUpdateMember = () => {
  const {
    mutate: updateMember,
    mutateAsync: updateMemberAsync,
    ...rest
  } = useCustomMutation<any, any>({
    url: '',
    method: 'post',
  })

  return {
    ...rest,
    updateMember,
    updateMemberAsync,
  }
}

export const useDeleteMember = () => {
  const {
    mutate: DeleteMember,
    mutateAsync: DeleteMemberAsync,
    ...rest
  } = useCustomMutation<any, any>({
    url: '',
    method: 'post',
  })

  return {
    ...rest,
    DeleteMember,
    DeleteMemberAsync,
  }
}
