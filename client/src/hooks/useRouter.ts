import { useParams, useLocation, useRouteMatch, useHistory } from 'react-router-dom'
import { useMemo } from 'react'
import { parse, stringify } from 'query-string'

export default function useRouter() {
  const params = useParams()
  const location = useLocation<{ prevPath?: string }>()
  const match: any = useRouteMatch()
  const history = useHistory()

  const query: any = {
    ...parse(location.search),
    ...params,
  }

  const setQuery = (newQuery: any) => {
    const queryStr = stringify(newQuery)
    const newPath = `${location.pathname}?${queryStr}`
    history.push(newPath)
  }

  const updateQuery = (obj: any, overwrite = false) => {
    const newQuery = Object.assign({}, query, obj)
    setQuery(overwrite ? obj : newQuery)
  }

  const push = (pathname: string) => {
    history.push({
      pathname,
      state: {
        prevPath: location.pathname,
      },
    })
  }

  return useMemo(() => {
    return {
      push,
      replace: history.replace,
      pathname: location.pathname,
      query,
      updateQuery,
      match,
      location,
      history,
    }
  }, [params, match, location, history])
}
