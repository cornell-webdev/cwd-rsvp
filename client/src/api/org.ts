import useCustomQuery from 'src/hooks/useCustomQuery'
import { IOrg } from 'src/types/org.type'

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
