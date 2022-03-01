import { AxiosError } from 'axios'
import { useMutation, useQueryClient } from 'react-query'
import api from 'src/api'
import { IQueryConfig } from './useCustomQuery'

interface IUpdateLocal {
  queryConfigs: IQueryConfig[]
  presetLogic?: 'appendStart' | 'appendEnd' | 'update' | 'delete'
  mutationFn?: (oldData: any, newVariables: any) => any
  refetchOnSettle?: boolean
}

interface IMutationOptions {
  url: string
  method: 'post' | 'put' | 'delete'
  localUpdates?: IUpdateLocal[]
}

interface ISnapshot {
  queryKey: any
  previousValues: any
}

export const queryConfigToKey = (queryConfig: IQueryConfig) => [
  queryConfig?.url,
  queryConfig?.variables,
]

const useCustomMutation = <TData, TArgs = any>({
  url,
  method,
  localUpdates: localUpdatesProp,
}: IMutationOptions) => {
  const queryClient = useQueryClient()
  const localUpdates = localUpdatesProp?.map((localUpdate) => ({
    refetchOnSettle: true,
    ...localUpdate,
  }))
  const updateLocalConfig = localUpdates
    ? {
        // When mutate is called:
        onMutate: (newVariables: any) => {
          if (localUpdates) {
            localUpdates.forEach((localUpdate) => {
              const snapshots: ISnapshot[] = []

              localUpdate.queryConfigs.forEach((queryConfig) => {
                const queryKey = queryConfigToKey(queryConfig)

                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                queryClient.cancelQueries(queryKey)

                // Snapshot the previous value
                const previousValues = queryClient.getQueryData(queryKey)

                if (localUpdate.mutationFn || localUpdate.presetLogic) {
                  // Optimistically update to the new value

                  queryClient.setQueryData(queryKey, (oldData: any) => {
                    // custom mutationFn
                    if (localUpdate.mutationFn) {
                      return localUpdate.mutationFn(oldData, newVariables)
                    }

                    // appendStart
                    if (localUpdate.presetLogic === 'appendStart') {
                      if (oldData) return [newVariables, ...oldData]
                      return [newVariables]
                    }

                    // appendEnd
                    if (localUpdate.presetLogic === 'appendEnd') {
                      if (oldData) return [...oldData, newVariables]
                      return [newVariables]
                    }

                    // update
                    if (localUpdate.presetLogic === 'update') {
                      // update by id
                      if (newVariables._id) {
                        const newValues = oldData?.map((value: any) => {
                          if (value._id === newVariables._id) {
                            return { ...value, ...newVariables }
                          }
                          return value
                        })
                        return newValues
                      } else {
                        // if newVariables._id not defined, dont update locally
                        if (oldData) return [...oldData]
                        return undefined
                      }
                    }

                    // delete
                    if (localUpdate.presetLogic === 'delete') {
                      // delete by id
                      if (newVariables._id) {
                        const newValues = oldData?.filter(
                          (value: any) => value._id !== newVariables._id
                        )
                        return newValues
                      } else {
                        // if newVariables._id not defined, dont delete locally
                        if (oldData) return [...oldData]
                        return undefined
                      }
                    }

                    if (oldData) return [...oldData]
                    return undefined
                  })
                }

                snapshots.push({ queryKey, previousValues })
              })

              // Return the snapshotted values
              return () => {
                snapshots.forEach(({ queryKey, previousValues }) => {
                  queryClient.setQueryData(queryKey, previousValues)
                })
              }
            })
          }
        },

        // If the mutation fails, use the value returned from onMutate to roll back
        onError: (err: any, newVariables: any, rollback: any) => {
          if (rollback) {
            const rollbackData = rollback()
            return rollbackData
          }
          if (err) return {}
          return {}
        },

        // Always refetch after error or success:
        onSettled: () => {
          if (localUpdates) {
            localUpdates.forEach((localUpdate) => {
              if (localUpdate.refetchOnSettle) {
                localUpdate.queryConfigs.forEach(({ url, variables }) => {
                  const queryKey = [url, variables]
                  queryClient.invalidateQueries(queryKey)
                })
              }
            })
          }
        },
      }
    : {}

  const { mutate, ...mutationInfo } = useMutation<TData, AxiosError, TArgs>(
    (variables: any) =>
      new Promise((resolve, reject) => {
        ;(async () => {
          try {
            const data = (await api(method, url, variables)) as TData
            resolve(data)
          } catch (error) {
            reject(error)
          }
        })()
      }),
    { ...updateLocalConfig }
  )

  return { mutate, ...mutationInfo }
}

export default useCustomMutation
