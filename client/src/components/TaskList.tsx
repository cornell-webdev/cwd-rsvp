const is = 'deprecated'

export default is
// import React, { useEffect, useState } from 'react'
// import theme from 'src/app/theme'
// import Text from 'src/components/fonts/Text'
// import Space from 'src/components/layout/Space'
// import useIsInbox from 'src/hooks/useIsInbox'
// import { default as useKeyPress } from 'src/hooks/useKeyPress'
// import usePreviousValue from 'src/hooks/usePreviousValue'
// import TaskItem from 'src/pages/inbox/task-item/TaskItem'
// import { IInboxState, ITask } from 'src/types/task.type'
// import { getDateStamp, getDay } from 'src/util/date'
// import { isTaskTimeSet } from 'src/util/task'
// import styled from 'styled-components'
// import { FlexRow } from './layout/Flex'

// interface TaskListProps {
//   focusId: string | undefined
//   setFocusId: (value: string | undefined) => void
//   inboxState: IInboxState
//   setInboxState: (state: IInboxState) => void
//   tasks?: ITask[]
// }

// const TaskList = ({ focusId, setFocusId, inboxState, setInboxState, tasks }: TaskListProps) => {
//   const previousTasks: ITask[] = usePreviousValue(tasks)
//   const isInbox = useIsInbox()

//   // focus first task after fetching tasks
//   useEffect(() => {
//     if ((!previousTasks || previousTasks?.length === 0) && tasks && tasks?.length > 0 && !focusId) {
//       setFocusId(tasks[0]?._id)
//     }
//   }, [tasks])

//   // handle focusId missing in new tasks
//   useEffect(() => {
//     if (tasks && previousTasks) {
//       const currentIdx = tasks.findIndex((task) => task._id === focusId)
//       const previousIdx = previousTasks.findIndex((task) => task._id === focusId)
//       if (currentIdx === -1 && previousIdx !== -1) {
//         const nearbyTask = tasks[previousIdx] || tasks[previousIdx - 1] || tasks[previousIdx + 1]
//         setFocusId(nearbyTask?._id)
//       }
//     }
//   }, [tasks, previousTasks])

//   // store important idxes in local state
//   const [firstTaskOfDayIdxes, setFirstTaskOfDayIdxes] = useState<number[]>([])
//   const [dividerIdxes, setDividerIdxes] = useState<number[]>([])

//   useEffect(() => {
//     const newFirstTaskOfDayIdxes: number[] = []
//     const newDividerIdxes: number[] = []

//     tasks?.forEach((task, idx) => {
//       const isDateStampIdx =
//         idx === 0 || getDateStamp(task?.due) !== getDateStamp(tasks[idx - 1]?.due)
//       const isDividerIdx = idx !== 0 && isTaskTimeSet(task) && !isTaskTimeSet(tasks[idx - 1])

//       if (isDateStampIdx) newFirstTaskOfDayIdxes.push(idx)
//       if (isDividerIdx) newDividerIdxes.push(idx)
//     })

//     setFirstTaskOfDayIdxes(newFirstTaskOfDayIdxes)
//     setDividerIdxes(newDividerIdxes)
//   }, [tasks])

//   // focus handling
//   useKeyPress('ArrowUp', (event) => {
//     if (inboxState === 'NAVIGATE') {
//       event.stopPropagation()
//       event.stopImmediatePropagation()
//       event.preventDefault()

//       if ((event.metaKey || event.ctrlKey) && tasks) {
//         // jump to first task of day
//         let hasJumped = false
//         const focusIdx = tasks?.findIndex((task) => task?._id === focusId)
//         firstTaskOfDayIdxes.forEach((idx, i) => {
//           if (!hasJumped && idx >= focusIdx) {
//             const jumpIdx = firstTaskOfDayIdxes[i - 1 || 0]
//             setFocusId(tasks[jumpIdx]?._id)
//             hasJumped = true
//           }
//         })
//       } else if (event.altKey) {
//         // move focus up by 2
//         tasks?.forEach((task, idx) => {
//           const targetTask = tasks[idx - 2] || tasks[idx - 1]
//           if (task?._id === focusId && idx !== 0) {
//             setFocusId(targetTask?._id)
//           }
//         })
//       } else {
//         tasks?.forEach((task, idx) => {
//           if (task?._id === focusId && idx !== 0) {
//             setFocusId(tasks[idx - 1]?._id)
//           }
//         })
//       }
//     }
//   })

//   useKeyPress('ArrowDown', (event) => {
//     if (inboxState === 'NAVIGATE') {
//       event.stopPropagation()
//       event.stopImmediatePropagation()
//       event.preventDefault()
//       if ((event.metaKey || event.ctrlKey) && tasks) {
//         let hasJumped = false
//         const focusIdx = tasks?.findIndex((task) => task?._id === focusId)
//         firstTaskOfDayIdxes.forEach((idx) => {
//           if (!hasJumped && idx > focusIdx) {
//             setFocusId(tasks[idx]?._id)
//             hasJumped = true
//           }
//         })
//       } else if (event.altKey) {
//         // move focus down by 2
//         tasks?.forEach((task, idx) => {
//           if (task?._id === focusId && idx + 1 !== tasks?.length) {
//             const targetTask = tasks[idx + 2] || tasks[idx + 1]
//             setFocusId(targetTask?._id)
//           }
//         })
//       } else {
//         tasks?.forEach((task, idx) => {
//           if (task?._id === focusId && idx + 1 !== tasks?.length) {
//             setFocusId(tasks[idx + 1]?._id)
//           }
//         })
//       }
//     }
//   })

//   const focusNextTask = () => {
//     tasks?.forEach((task, idx) => {
//       if (task?._id === focusId && idx + 1 !== tasks?.length) {
//         setFocusId(tasks[idx + 1]?._id)
//       }
//     })
//   }

//   const focusPrevTask = () => {
//     tasks?.forEach((task, idx) => {
//       if (task?._id === focusId) {
//         if (idx - 1 >= 0) {
//           setFocusId(tasks[idx - 1]?._id)
//         } else if (tasks?.length >= 2) {
//           setFocusId(tasks[idx + 1]?._id)
//         }
//       }
//     })
//   }

//   // TODO: undo isComplete
//   // const { undoIsComplete } = useUndoIsComplete()
//   // const dispatch = useDispatch()
//   // useKeypress(['z', 'ㅋ'], async (event) => {
//   //   if (
//   //     inboxState === 'NAVIGATE' &&
//   //     (event.metaKey || event.ctrlKey)
//   //   ) {
//   //     event.stopPropagation()
//   //     event.stopImmediatePropagation()
//   //     event.preventDefault()
//   //     dispatch(
//   //       showSnackbar({
//   //         key: 'RECOVERING_TASK',
//   //         variant: 'info',
//   //         message: 'Recovering latest completed task',
//   //       })
//   //     )
//   //     await undoIsComplete({})
//   //     dispatch(
//   //       showSnackbar({
//   //         key: 'RECOVERED_TASK',
//   //         variant: 'success',
//   //         message: 'Recovered task',
//   //       })
//   //     )
//   //   }
//   // })

//   return (
//     <Container>
//       {tasks?.map((task, idx) => {
//         const renderDateStamp = firstTaskOfDayIdxes.includes(idx)
//         const renderDividingSpace = dividerIdxes.includes(idx)

//         return (
//           <div key={`${task?._id}${new Date(task?.createdAt).getTime()}`}>
//             {isInbox && renderDateStamp && (
//               <DateHeader>
//                 <Text variant='h3' color={theme.text.light} fontWeight={700}>
//                   {task?.due ? getDateStamp(task?.due) : 'Backlog'}{' '}
//                 </Text>
//                 <Space padding='0 .3rem' />
//                 <Text variant='h3' color={theme.text.muted} fontWeight={700}>
//                   {task?.due && getDay(task?.due)}
//                 </Text>
//               </DateHeader>
//             )}
//             {renderDividingSpace && <Space padding='.5rem 0' />}
//             <TaskItem
//               task={task}
//               idx={idx}
//               isFocused={focusId === task?._id}
//               isSelected={false}
//               setFocusId={setFocusId}
//               inboxState={inboxState}
//               setInboxState={setInboxState}
//               focusNextTask={focusNextTask}
//               focusPrevTask={focusPrevTask}
//             />
//           </div>
//         )
//       })}
//     </Container>
//   )
// }

// const Container = styled.div`
//   width: 100%;
// `

// const DateHeader = styled(FlexRow)`
//   margin: 1.5rem 0 0.3rem 0;
// `

// export default TaskList
