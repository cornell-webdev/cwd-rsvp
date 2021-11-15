import useRouter from './useRouter'

const useIsArchive = () => {
  const { pathname } = useRouter()
  return pathname === '/archive'
}

export default useIsArchive
