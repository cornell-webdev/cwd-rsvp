import express from 'express'
import moment from 'moment'
import Task from '../../models/Task'
import { ITaskDocument } from '../../types/task.type'
import { fetchGcalTasks } from '../../util/calendar'
import { areSameDates } from '../../util/date'

const taskRouter = express.Router()

// create task
taskRouter.post('/', async (req, res) => {
  try {
    const doc = await new Task({
      ...req.body,
      userId: req.user?._id,
    }).save()
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

taskRouter.get('/inbox/gcal', async (req, res) => {
  try {
    const dueDate = req?.query?.due && new Date(req?.query?.due as string)
    const gcalTasks = await fetchGcalTasks({
      req,
      due: dueDate as Date,
      isTimed: false,
    })

    res.send(gcalTasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

taskRouter.get('/inbox/prosys', async (req, res) => {
  try {
    const dueDate = req?.query?.due && new Date(req?.query?.due as string)
    const due = req?.query?.due
      ? {
          $gte: moment(dueDate).startOf('day').toDate(),
          $lte: moment(dueDate).endOf('day').toDate(),
        }
      : null

    const timeQuery =
      req?.query?.isTimed === 'true'
        ? {
            $or: [{ startTime: { $ne: '0000' } }, { endTime: { $ne: '0000' } }],
          }
        : {
            startTime: '0000',
            endTime: '0000',
          }

    const query = {
      userId: req.user?._id,
      isArchived: false,
      isComplete: false,
      provider: undefined,
      due,
      ...timeQuery,
    }

    const tasks = await Task.find(query).sort({ createdAt: req?.query?.due ? 1 : -1 })

    if (
      req?.query?.isTimed !== 'true' &&
      req?.query?.due &&
      areSameDates(new Date(req?.query?.due as string), new Date())
    ) {
      // if requesting for today's tasks
      // rollover tasks due at previous days
      const previousTasks = await Task.find({
        userId: req.user?._id,
        isArchived: false,
        isComplete: false,
        provider: undefined,
        due: {
          $lte: moment(dueDate).startOf('day').toDate(),
        },
      }).sort({ createdAt: 1 })

      previousTasks.forEach((task: ITaskDocument) => {
        // TODO: don't reset time if task is recurring
        // const updatedFields = task?.isRecur
        //   ? {
        //       due: new Date(),
        //     }
        // : {
        //     due: new Date(),
        //     startTime: '0000',
        //     endTime: '0000',
        //   }

        const updatedFields = {
          due: new Date(),
          startTime: '0000',
          endTime: '0000',
        }
        Task.findByIdAndUpdate(task?._id, updatedFields).exec()
        tasks.unshift({
          ...task?.toObject(),
          ...updatedFields,
        } as ITaskDocument)
      })
    }

    if (req?.query?.isTimed === 'true' && dueDate) {
      const gcalTasks = await fetchGcalTasks({
        req,
        due: dueDate as Date,
        isTimed: true,
      })

      gcalTasks.forEach((task) => tasks.push(task as ITaskDocument))

      tasks.sort((a, b) => {
        return (
          Number(a?.startTime) - Number(b?.startTime) || Number(a?.endTime) - Number(b?.endTime)
        )
      })
    }

    res.send(tasks)
  } catch (e) {
    res.status(500).send(e)
  }
})

// get user's archived
taskRouter.get('/archive', async (req, res) => {
  try {
    const docs = await Task.find({
      userId: req.user?._id,
      isArchived: true,
      isComplete: false,
    }).sort({ createdAt: -1 })
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
})

// get all user's tasks
taskRouter.get('/', async (req, res) => {
  try {
    const docs = await Task.find({ userId: req.user?._id })
    res.send(docs)
  } catch (e) {
    res.status(500).send(e)
  }
})

taskRouter.get('/:id', async (req, res) => {
  try {
    const doc = await Task.findById(req.params.id)
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

taskRouter.put('/undo', async (req, res) => {
  try {
    const doc = await Task.findOneAndUpdate(
      { userId: req.user?._id, isComplete: true },
      { isComplete: false },
      { new: true }
    ).sort({ updatedAt: -1 })
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

taskRouter.put('/:id', async (req, res) => {
  try {
    const updateObj = { ...req.body }
    // if (
    //   (updateObj?.startTime !== '0000' && updateObj?.endTime === '0000') ||
    //   (updateObj?.endTime !== '0000' && updateObj?.startTime === '0000')
    // ) {
    //   ('reset times')
    //   updateObj.startTime = '0000'
    //   updateObj.endTime = '0000'
    // }
    const doc = await Task.findByIdAndUpdate(req.params.id, updateObj, {
      new: true,
    })
    res.send(doc)
  } catch (e) {
    res.status(500).send(e)
  }
})

taskRouter.delete('/:id', async (req, res) => {
  try {
    const result = await Task.findByIdAndDelete(req.params.id)
    res.send(result)
  } catch (e) {
    res.status(500).send(e)
  }
})

export default taskRouter
