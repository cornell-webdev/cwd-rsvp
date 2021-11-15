import useRouter from './useRouter'

const useIsCreateCard = () => {
  const { pathname } = useRouter()
  return pathname === '/wiki/create'
}

export default useIsCreateCard
