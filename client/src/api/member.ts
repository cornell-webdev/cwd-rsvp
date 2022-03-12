import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { IMember } from 'src/types/member.type'

export const memberByNameQueryConfig = (name: string) => ({
  url: `/public/member/${name}`,
  options: {
    enabled: !!name,
  },
})

export const useMemberByName = (name: string) => {
  const { data: member, ...rest } = useCustomQuery<IMember>(memberByNameQueryConfig(name))

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
    mutate: deleteMember,
    mutateAsync: deleteMemberAsync,
    ...rest
  } = useCustomMutation<IMember, { name: string }>({
    url: 'public/member/delete',
    method: 'delete',
  })

  return {
    ...rest,
    deleteMember,
    deleteMemberAsync,
  }
}
