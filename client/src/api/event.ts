import useCustomMutation from 'src/hooks/useCustomMutation'
import useCustomQuery from 'src/hooks/useCustomQuery'
import { IEvent } from 'src/types/event.type'

export interface IUseEvents {
  date: Date
  tagId?: string
}

export const eventsQueryConfig = ({ date, tagId }: IUseEvents) => ({
  url: `/public/event?date=${date}&tagId=${tagId}`,
  options: {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  },
})

export const useEvents = ({ date, tagId }: IUseEvents) => {
  const { data: events, ...rest } = useCustomQuery<IEvent[]>(eventsQueryConfig({ date, tagId }))

  return {
    ...rest,
    events,
  }
}

export const likedEventsQueryConfig = () => ({
  url: `/private/event/liked-events`,
  options: {
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  },
})

export const useLikedEvents = () => {
  const { data: likedEvents, ...rest } = useCustomQuery<IEvent[]>(likedEventsQueryConfig())

  return {
    ...rest,
    likedEvents,
  }
}

export const eventByIdQueryConfig = (eventId: string) => ({
  url: `/public/event/${eventId}`,
  options: {
    enabled: !!eventId,
  },
})

export const useEventById = (eventId: string) => {
  const { data: event, ...rest } = useCustomQuery<IEvent>(eventByIdQueryConfig(eventId))

  return {
    ...rest,
    event,
  }
}

export const myEventsQueryConfig = () => ({
  url: `/private/event`,
})

export const useMyEvents = () => {
  const { data: myEvents, ...rest } = useCustomQuery<IEvent[]>(myEventsQueryConfig())

  return {
    ...rest,
    myEvents,
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

export const useIncrementEventViews = () => {
  const {
    mutate: incrementEventViews,
    mutateAsync: incrementEventViewsAsync,
    ...rest
  } = useCustomMutation<IEvent, { _id: string }>({
    url: '/public/event/increment-views',
    method: 'post',
  })

  return {
    ...rest,
    incrementEventViews,
    incrementEventViewsAsync,
  }
}

export const useToggleEventLike = () => {
  const {
    mutate: toggleEventLike,
    mutateAsync: toggleEventLikeAsync,
    ...rest
  } = useCustomMutation<IEvent>({
    url: '/private/event/toggle-like',
    method: 'post',
  })

  return {
    ...rest,
    toggleEventLike,
    toggleEventLikeAsync,
  }
}

export const useCreateEvent = () => {
  const { mutateAsync: createEventAsync, ...rest } = useCustomMutation<IEvent>({
    url: '/private/event',
    method: 'post',
    localUpdates: [
      {
        queryConfigs: [myEventsQueryConfig()],
      },
    ],
  })

  return {
    ...rest,
    createEventAsync,
  }
}

export const useDeleteEvent = () => {
  const { mutateAsync: deleteEventAsync, ...rest } = useCustomMutation<IEvent>({
    url: '/private/event',
    method: 'delete',
    localUpdates: [
      {
        queryConfigs: [myEventsQueryConfig()],
      },
    ],
  })

  return {
    ...rest,
    deleteEventAsync,
  }
}

export const useUpdateEventById = (eventId: string) => {
  const { mutateAsync: updateEventAsync, ...rest } = useCustomMutation<IEvent>({
    url: `/private/event/${eventId}/update`,
    method: 'put',
    localUpdates: [
      {
        queryConfigs: [myEventsQueryConfig(), eventByIdQueryConfig(eventId)],
      },
    ],
  })

  return {
    ...rest,
    updateEventAsync,
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
