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

export const allOrgsQueryConfig = () => ({
  url: `/public/org`,
})

export const useAllOrgs = () => {
  const { data: allOrgs, ...rest } = useCustomQuery<IOrg[]>(allOrgsQueryConfig())

  return {
    ...rest,
    allOrgs,
  }
}

export const orgByIdQueryConfig = (orgId: string) => ({
  url: `/public/org/${orgId}`,
})

export const useOrgById = (orgId: string) => {
  const { data: org, ...rest } = useCustomQuery<IOrg>(orgByIdQueryConfig(orgId))

  return {
    ...rest,
    org,
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

export const useCreateOrg = () => {
  const { mutateAsync: createOrgAsync, ...rest } = useCustomMutation<IOrg>({
    url: `/private/org`,
    method: 'post',
    localUpdates: [
      {
        queryConfigs: [myOrgsQueryConfig()],
      },
    ],
  })

  return {
    ...rest,
    createOrgAsync,
  }
}

export const useUpdateOrgById = (orgId: string) => {
  const { mutateAsync: updateOrgAsync, ...rest } = useCustomMutation<IOrg>({
    url: `/private/org/${orgId}/update`,
    method: 'put',
    localUpdates: [
      {
        queryConfigs: [myOrgsQueryConfig()],
      },
    ],
  })

  return {
    ...rest,
    updateOrgAsync,
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

export const searchedOrgsQueryConfig = (query: string) => ({
  url: `/public/org/search?query=${query}`,
})

export const useSearchedOrgs = (query: string) => {
  const { data: searchedOrgs, ...rest } = useCustomQuery<IOrg[]>(searchedOrgsQueryConfig(query))

  return {
    ...rest,
    searchedOrgs,
  }
}
