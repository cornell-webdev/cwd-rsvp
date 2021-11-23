import useCustomQuery from 'src/hooks/useCustomQuery'
import { IEvent } from 'src/types/event.type'

export interface IUseEvents {
  date: Date
  tagId?: string
}

export const eventsQueryConfig = ({ date, tagId }: IUseEvents) => ({
  url: `/public/event?date=${date}&tagId=${tagId}`,
})

export const useEvents = ({ date, tagId }: IUseEvents) => {
  const { data: events, ...rest } = useCustomQuery<IEvent[]>(eventsQueryConfig({ date, tagId }))

  return {
    ...rest,
    events,
  }
}

export const trendingEventsQueryConfig = () => ({
  url: `/public/event/trending`,
})

export const useTrendingEvents = () => {
  const { data: trendingEvents, ...rest } = useCustomQuery<IEvent[]>(trendingEventsQueryConfig())

  return {
    ...rest,
    trendingEvents,
  }
}

export const searchedEventsQueryConfig = (query: string) => ({
  url: `/public/event/search?query=${query}`,
})

export const useSearchedEvents = (query: string) => {
  const { data: searchedEvents, ...rest } = useCustomQuery<IEvent[]>(
    searchedEventsQueryConfig(query)
  )

  return {
    ...rest,
    searchedEvents,
  }
}

// export const prosysTasksConfig = (params: IUseProsysTasksParams) => {
//   return {
//     url: `/private/task/inbox/prosys?${stringify(
//       {
//         due: params?.due ? getStartOfDay(new Date(params?.due)) : null,
//         isTimed: params?.isTimed,
//       },
//       { skipNull: true }
//     )}`,
//     options: {
//       refetchOnWindowFocus: false,
//     },
//   }
// }

// export const useProsysTasks = (params: IUseProsysTasksParams) => {
//   const { data: tasks, ...rest } = useCustomQuery<ITask[]>(prosysTasksConfig(params))

//   return {
//     ...rest,
//     tasks,
//   }
// }

// export const fetchArchivedTasks = () => ({
//   url: '/private/task/archive',
//   options: {
//     refetchOnWindowFocus: 'always',
//   },
// })

// export const useArchivedTasks = () => {
//   const { data: tasks, ...rest } = useCustomQuery<ITask[]>(fetchArchivedTasks())

//   return {
//     ...rest,
//     tasks,
//   }
// }

// export const useCreateTask = (params: IUseProsysTasksParams) => {
//   const { mutate: createTask, ...rest } = useCustomMutation<ITask>({
//     url: '/private/task',
//     method: 'post',
//     localUpdates: [
//       {
//         queryConfigs: [prosysTasksConfig(params)],
//         presetLogic: 'appendStart',
//       },
//     ],
//   })

//   return {
//     ...rest,
//     createTask,
//   }
// }

// export const useCreateInboxTaskAtDate = (params: IUseProsysTasksParams) => {
//   const { mutate: createTask, ...rest } = useCustomMutation<ITask>({
//     url: '/private/task',
//     method: 'post',
//     localUpdates: [
//       {
//         queryConfigs: [prosysTasksConfig(params)],
//         presetLogic: 'appendEnd',
//       },
//     ],
//   })

//   return {
//     ...rest,
//     createTask,
//   }
// }

// export const useCreateArchiveTask = () => {
//   const { mutate: createArchiveTask, ...rest } = useCustomMutation<ITask>({
//     url: '/private/task',
//     method: 'post',
//     localUpdates: [
//       {
//         queryConfigs: [fetchArchivedTasks()],
//         presetLogic: 'appendStart',
//       },
//     ],
//   })

//   return {
//     ...rest,
//     createArchiveTask,
//   }
// }

// export const useUpdateInboxTaskById = (_id: string, params: IUseProsysTasksParams) => {
//   const { mutate: updateInboxTask, ...rest } = useCustomMutation<ITask>({
//     url: `/private/task/${_id}`,
//     method: 'put',
//     localUpdates: [
//       {
//         queryConfigs: [prosysTasksConfig(params)],
//         presetLogic: 'update',
//         refetchOnSettle: false,
//       },
//     ],
//   })

//   return {
//     ...rest,
//     updateInboxTask,
//   }
// }

// export const useUpdateAndMoveTask = (_id: string, params: IUseProsysTasksParams) => {
//   const queryClient = useQueryClient()

//   const { mutate: updateAndMove, ...rest } = useCustomMutation<ITask>({
//     url: `/private/task/${_id}`,
//     method: 'put',
//     localUpdates: [
//       {
//         queryConfigs: [prosysTasksConfig(params)],
//         presetLogic: 'update',
//         refetchOnSettle: false,
//       },
//       {
//         queryConfigs: [prosysTasksConfig(params)],
//         refetchOnSettle: false,
//         mutationFn: (oldData, newVariables) => {
//           // if task doesn't need to move, don't move it
//           if (
//             (!params?.due && !newVariables?.due) ||
//             (params?.due?.toUTCString() === newVariables?.due?.toUTCString() &&
//               params?.isTimed === isOneTaskTimeSet(newVariables))
//           ) {
//             return oldData
//           }

//           // add to new query cache
//           const targetQueryKey = queryConfigToKey(
//             prosysTasksConfig({
//               isTimed: isOneTaskTimeSet(newVariables),
//               due: newVariables?.due,
//             })
//           )

//           queryClient.setQueryData(targetQueryKey, (oldData: any) => {
//             // use appropriate logic depending on whether it's timed or not
//             if (params?.isTimed) {
//               return insertTimedTask({
//                 tasks: oldData || [],
//                 newTask: newVariables,
//               })
//             } else {
//               return insertUntimedTask({
//                 tasks: oldData || [],
//                 newTask: newVariables,
//               })
//             }
//           })

//           // remove from current query cache
//           return oldData?.filter((task: ITask) => task?._id !== newVariables?._id)
//         },
//       },
//     ],
//   })

//   return {
//     ...rest,
//     updateAndMove,
//   }
// }

// export const useUpdateArchiveTaskById = (
//   _id: string,
//   options: IUseUpdateInboxTaskByIdOptions = {
//     due: new Date(),
//     refetchOnSettle: false,
//   }
// ) => {
//   const { mutate: updateArchiveTask, ...rest } = useCustomMutation<ITask>({
//     url: `/private/task/${_id}`,
//     method: 'put',
//     localUpdates: [
//       {
//         queryConfigs: [fetchArchivedTasks()],
//         presetLogic: 'update',
//         refetchOnSettle: options?.refetchOnSettle,
//       },
//     ],
//   })

//   return {
//     ...rest,
//     updateArchiveTask,
//   }
// }

// export const useToggleArchive = (_id: string) => {
//   const { mutate: toggleArchive, ...rest } = useCustomMutation<ITask>({
//     url: `/private/task/${_id}`,
//     method: 'put',
//     localUpdates: [
//       {
//         queryConfigs: [fetchInboxTasks(), fetchArchivedTasks()],
//         presetLogic: 'delete',
//       },
//     ],
//   })

//   return {
//     ...rest,
//     toggleArchive,
//   }
// }

// export const useUndoIsComplete = () => {
//   const { mutateAsync: undoIsComplete, ...rest } = useCustomMutation<ITask>({
//     url: `/private/task/undo`,
//     method: 'put',
//     localUpdates: [
//       {
//         queryConfigs: [fetchInboxTasks(), fetchArchivedTasks()],
//       },
//     ],
//   })

//   return {
//     ...rest,
//     undoIsComplete,
//   }
// }