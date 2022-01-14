import Org from '../models/Org'
import Event from '../models/Event'
import { IEventDate } from '../types/event.type'

const verifyDatabase = async () => {
  console.log('*** checking event duplicates')
  const events = await Event.find()
  const dupEvents = []
  const dupDates: { title: string; dates: IEventDate[] }[] = []
  for (const event of events) {
    const duplicates = await Event.find({ title: event.title })
    if (duplicates?.length > 1) {
      dupEvents.push(event.title)
    }
    event.dates.forEach((date1, idx1) => {
      event.dates.forEach((date2, idx2) => {
        if (
          idx1 !== idx2 &&
          date1.date.toString() === date2.date.toString() &&
          date1.startTime === date2.startTime &&
          date1.endTime === date2.endTime
        ) {
          dupDates.push({ title: event.title, dates: event.dates })
        }
      })
    })
  }
  console.log('duplicate event names:', dupEvents)
  console.log('duplicate event dates:', dupDates)

  console.log('*** checking org duplicates')
  const orgs = await Org.find()
  const dupOrgs = []
  for (const org of orgs) {
    const duplicates = await Org.find({ name: org.name })
    if (duplicates?.length > 1) {
      dupOrgs.push(org.name)
    }
  }
  console.log('duplicate org names:', dupOrgs)

  console.log('*** checking for events with empty dates')
  const emptyDatesEvents = await Event.find({ dates: [] })
  const eventNames = emptyDatesEvents.map((event) => event.title)
  console.log('empty date event names:', eventNames)
}

export default verifyDatabase
