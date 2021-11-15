import { google } from 'googleapis'
import { IFetchGcalTasksParams, ITask } from '../types/task.type'
import { getEndOfDay, getTimeStamp } from './date'
import { Types } from 'mongoose'

export const fetchGcalTasks = async ({ req, due, isTimed }: IFetchGcalTasksParams) => {
  const OAuth2 = google.auth.OAuth2
  const oAuth2Client = new OAuth2(
    process.env.ID_GOOGLE,
    process.env.SECRET_GOOGLE,
    `${process.env.SERVER_DOMAIN}/api/public/auth/google/callback`
  )

  oAuth2Client.setCredentials({
    refresh_token: req.user?.providerData.refreshToken,
  })

  const calendar = google.calendar({
    version: 'v3',
    auth: oAuth2Client,
  })

  const { data: primaryData } = await calendar.events.list({
    calendarId: 'primary',
    timeMin: due.toISOString(),
    timeMax: getEndOfDay(due).toISOString(),
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime',
  })

  const { data: secondaryData } = await calendar.events.list({
    calendarId: 'jaehyungjoo1@gmail.com',
    timeMin: due.toISOString(),
    timeMax: getEndOfDay(due).toISOString(),
    maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime',
  })

  const events = [...(primaryData?.items || []), ...(secondaryData?.items || [])]

  const tasks: ITask[] = []

  events?.forEach((event) => {
    const commonTaskData: any = {
      _id: Types.ObjectId(),
      userId: req.user?._id,
      providerTaskId: event.id,
      provider: 'google',
      providerData: event,
      name: event.summary,
      notes: event.description?.replace(/(<([^>]+)>)/gi, ''),
    }
    if (!isTimed && event?.start?.date) {
      // untimed
      tasks.push({
        ...commonTaskData,
        due: new Date(event.start.date),
        startTime: '0000',
        endTime: '0000',
      })
    } else if (isTimed && event?.start?.dateTime && event?.end?.dateTime) {
      // timed
      tasks.push({
        ...commonTaskData,
        due: new Date(event.start.dateTime),
        startTime: getTimeStamp(new Date(event.start.dateTime)),
        endTime: getTimeStamp(new Date(event.end.dateTime)),
      })
    }
  })

  return tasks
}

// export const syncCalendar = async (req: Request, res: Response) => {
//   try {
//     const events = await getEvents(req, res)

//     const calendarTasks = await Task.find({
//       userId: req.user?._id,
//       provider: 'google',
//     })
//     const updatedTasks: string[] = []

//     const syncPromises = events.map(async (event) => {
//       // create task object from calendar event
//       const taskData: any = {
//         userId: req.user?._id,
//         providerTaskId: event.id,
//         provider: 'google',
//         providerData: event,
//         name: event.summary,
//         notes: event.description?.replace(/(<([^>]+)>)/gi, ''),
//       }
//       if (event?.start?.date) {
//         taskData.due = new Date(event.start.date)
//       } else if (event?.start?.dateTime && event?.end?.dateTime) {
//         // set due, startTime, endTime
//         taskData.due = new Date(event.start.dateTime)
//         taskData.startTime = getTimeStamp(new Date(event.start.dateTime))
//         taskData.endTime = getTimeStamp(new Date(event.end.dateTime))
//       }

//       const matchedTasks: ITaskDocument[] = []
//       calendarTasks?.forEach((task) => {
//         if (task?.providerTaskId === event.id) {
//           matchedTasks.push(task)
//         }
//       })

//       if (matchedTasks?.length >= 1 && event?.id) {
//         // update existing tasks
//         const updatePromises = matchedTasks.map(async (task, idx) => {
//           if (event?.id) {
//             if (idx === 0) {
//               // update one
//               await Task.findOneAndUpdate({ providerTaskId: event?.id }, taskData)
//               updatedTasks.push(event.id)
//             } else {
//               // delete duplicates
//               await Task.findOneAndDelete({ providerTaskId: event?.id })
//             }
//           }
//         })
//         await Promise.all(updatePromises)
//       } else {
//         // create new task
//         await new Task(taskData).save()
//       }
//     })

//     await Promise.all(syncPromises)

//     // delete all calendar tasks that weren't updated (likely deleted in google calendar)
//     const tasksToDelete = calendarTasks.filter(
//       (task) => task.providerTaskId && !updatedTasks.includes(task.providerTaskId)
//     )
//     const deletePromises = tasksToDelete.map(async (task) => {
//       await Task.findByIdAndDelete(task?._id)
//     })

//     await Promise.all(deletePromises)
//   } catch (error) {
//     console.log('error', error)
//     res.status(500).send('Google OAuth error')
//   }
// }
