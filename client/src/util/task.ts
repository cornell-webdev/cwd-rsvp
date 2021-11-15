import { ITask, IInsertTaskProps } from 'src/types/task.type'

export const isTaskTimeSet = (task: ITask): boolean => {
  return (
    task.startTime != null &&
    task.startTime !== '0000' &&
    task.endTime != null &&
    task.endTime !== '0000'
  )
}

export const isOneTaskTimeSet = (task: ITask): boolean => {
  return (
    (task.startTime != null && task.startTime !== '0000') ||
    (task.endTime != null && task.endTime !== '0000')
  )
}

export const incrementTimeStamp = (timeStamp: string) => {
  if (Number(timeStamp)) {
    return `0${(Number(timeStamp) + 100).toString()}`.slice(-4)
  }
  return '0000'
}

export const sortTasks = (tasks: ITask[]) => {
  tasks?.sort((a, b) => {
    const aStartDate = a.due
      ? new Date(a.due).setHours(
          Number(a.startTime?.slice(0, 2)),
          Number(a.startTime?.slice(2, 4)),
          0,
          0
        )
      : 0

    const bStartDate = b.due
      ? new Date(b.due).setHours(
          Number(b.startTime?.slice(0, 2)),
          Number(b.startTime?.slice(2, 4)),
          0,
          0
        )
      : 0

    const aEndDate = a.due
      ? new Date(a.due).setHours(
          Number(a.endTime?.slice(0, 2)),
          Number(a.endTime?.slice(2, 4)),
          0,
          0
        )
      : 0

    const bEndDate = b.due
      ? new Date(b.due).setHours(
          Number(b.endTime?.slice(0, 2)),
          Number(b.endTime?.slice(2, 4)),
          0,
          0
        )
      : 0

    const untimedSortValue =
      a?.provider === 'google'
        ? -1
        : new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()

    return aStartDate - bStartDate || aEndDate - bEndDate || untimedSortValue
  })
  return tasks
}

export const insertUntimedTask = ({ tasks, newTask }: IInsertTaskProps) => {
  // prevent duplicates
  const duplicateIdx = tasks?.findIndex((task: ITask) => task?._id === newTask?._id)

  if (duplicateIdx >= 0) return tasks

  // find idx of element that's created at before newTask
  const targetIdx = tasks?.findIndex((task: ITask) =>
    newTask?.due
      ? new Date(task?.createdAt) > new Date(newTask?.createdAt)
      : new Date(task?.createdAt) < new Date(newTask?.createdAt)
  )

  const newTasks = [...tasks]

  if (targetIdx === -1) {
    newTasks.push(newTask)
  } else {
    newTasks.splice(targetIdx, 0, newTask)
  }
  return newTasks
}

export const reinsertTimedTask = ({ tasks, newTask }: IInsertTaskProps) => {
  // if newTask doesn't exist in tasks, return tasks
  if (tasks.findIndex((task: ITask) => task?._id === newTask?._id) === -1) {
    return tasks
  }

  // find idx of element that has a later startTime than newTask
  const targetIdx = tasks?.findIndex(
    (task: ITask) =>
      Number(task?.startTime) > Number(newTask?.startTime) ||
      (Number(task?.startTime) === Number(newTask?.startTime) &&
        Number(task?.endTime) > Number(newTask?.endTime))
  )

  const newTasks = tasks?.filter((task: ITask) => task?._id !== newTask?._id)

  if (targetIdx === -1) {
    newTasks.push(newTask)
  } else {
    newTasks.splice(targetIdx - 1, 0, newTask)
  }
  return newTasks
}

export const insertTimedTask = ({ tasks, newTask }: IInsertTaskProps) => {
  // prevent duplicates
  const duplicateIdx = tasks?.findIndex((task: ITask) => task?._id === newTask?._id)

  if (duplicateIdx >= 0) return tasks

  // find idx of element that has a later startTime than newTask
  const targetIdx = tasks?.findIndex(
    (task: ITask) =>
      Number(task?.startTime) > Number(newTask?.startTime) ||
      (Number(task?.startTime) === Number(newTask?.startTime) &&
        Number(task?.endTime) > Number(newTask?.endTime))
  )

  const newTasks = [...tasks]

  if (targetIdx === -1) {
    newTasks.push(newTask)
  } else {
    newTasks.splice(targetIdx, 0, newTask)
  }
  return newTasks
}
