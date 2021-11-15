import { useSelector } from 'react-redux'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { IRootState } from 'src/types/redux.type'
import { IUser } from 'src/types/user.type'

export const currentUserConfig = (accessToken: string | null) => ({
  url: '/private/user/current',
  options: { enabled: accessToken != null },
})

export const useCurrentUser = () => {
  const { accessToken } = useSelector((state: IRootState) => state.authState)
  const { data: currentUser, ...rest } = useCustomQuery<IUser>(
    currentUserConfig(accessToken)
  )

  return {
    ...rest,
    currentUser: accessToken ? currentUser : null,
  }
}
