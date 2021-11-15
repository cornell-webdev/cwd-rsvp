import { useCurrentUser } from 'src/api/user'
import { routes } from 'src/app/Routes'

const useNavs = () => {
  const { currentUser } = useCurrentUser()
  const publicNavs = routes.filter((route) => route.isPublicNav)
  const privateNavs = routes.filter((route) => route.isPrivateNav)

  if (currentUser) return privateNavs

  return publicNavs
}

export default useNavs
