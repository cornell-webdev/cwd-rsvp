import useRouter from './useRouter'

const useIsWiki = () => {
  const { pathname } = useRouter()
  return pathname === '/wiki'
}

export default useIsWiki
