import useRouter from './useRouter'

const useIsSpacedRep = () => {
  const { pathname } = useRouter()
  return pathname === '/spaced-rep'
}

export default useIsSpacedRep
