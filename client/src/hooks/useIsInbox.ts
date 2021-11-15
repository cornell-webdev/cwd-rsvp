import useRouter from './useRouter'

const useIsInbox = () => {
  const { pathname } = useRouter()
  return pathname === '/inbox'
}

export default useIsInbox
