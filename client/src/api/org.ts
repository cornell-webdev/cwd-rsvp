import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { IOrg, IOrgLinkedUsers } from 'src/types/org.type'

export const myOrgsQueryConfig = () => ({
  url: `/private/org`,
})

export const useMyOrgs = () => {
  const { data: myOrgs, ...rest } = useCustomQuery<IOrg[]>(myOrgsQueryConfig())

  return {
    ...rest,
    myOrgs,
  }
}

export const orgLinkedUsersQueryConfig = (orgId: string) => ({
  url: `/private/org/${orgId}/linked-users`,
})

export const useOrgLinkedUsers = (orgId: string) => {
  const { data: orgLinkedUsers, ...rest } = useCustomQuery<IOrgLinkedUsers>(
    orgLinkedUsersQueryConfig(orgId)
  )

  return {
    ...rest,
    orgLinkedUsers,
  }
}

export const useOrgAddLinkedUser = (orgId: string) => {
  const { mutateAsync: addLinkedUserAsync, ...rest } = useCustomMutation<IOrg>({
    url: `/private/org/${orgId}/add-linked-user`,
    method: 'put',
    localUpdates: [
      {
        queryConfigs: [orgLinkedUsersQueryConfig(orgId)],
      },
    ],
  })

  return {
    ...rest,
    addLinkedUserAsync,
  }
}

export const useOrgRemoveLinkedUser = (orgId: string) => {
  const { mutateAsync: removeLinkedUserAsync, ...rest } = useCustomMutation<IOrg>({
    url: `/private/org/${orgId}/remove-linked-user`,
    method: 'put',
    localUpdates: [
      {
        queryConfigs: [orgLinkedUsersQueryConfig(orgId)],
      },
    ],
  })

  return {
    ...rest,
    removeLinkedUserAsync,
  }
}
