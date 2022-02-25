import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import api from 'src/api'

export interface IQueryConfig {
  url: string
  variables?: any
  options?: any
}

const useCustomQuery = <T>({ url, variables, options }: IQueryConfig) => {
  return useQuery<T, AxiosError>({
    queryKey: [url, variables],
    queryFn: () =>
      new Promise((resolve, reject) => {
        ;(async () => {
          try {
            const data = (await api('get', url, variables)) as T
            resolve(data)
          } catch (error) {
            reject(error)
          }
        })()
      }),
    ...options,
  })
}

export default useCustomQuery
