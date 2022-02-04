import Org from '../models/Org'
import Event from '../models/Event'
import { IEventDate } from '../types/event.type'
import { formatLocation } from './scrapeCampusGroups'

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
  const dupOrgNames: string[] = []
  for (const org of orgs) {
    const duplicates = await Org.find({ name: org.name })
    if (duplicates?.length > 1 && !dupOrgNames.includes(org.name)) {
      dupOrgNames.push(org.name)
    }
  }
  console.log('duplicate org names:', dupOrgNames)

  /* script to remove duplicate orgs
    do not send to production, as it could delete org documents that are linked to events
  */
  // const deletePromises = dupOrgNames.map(async (orgName: string) => {
  //   await Org.findOneAndDelete({ name: orgName })
  // })
  // const deleteRes = await Promise.all(deletePromises)
  // console.log(`removed ${deleteRes?.length} dup orgs`)

  console.log('*** checking for events with empty dates')
  const emptyDatesEvents = await Event.find({ dates: [] })
  const eventNames = emptyDatesEvents.map((event) => event.title)
  console.log('empty date event names:', eventNames)

  console.log('*** checking for unformatted virtual events')
  const unformattedEvents = await Event.find({ location: { $regex: '<div', $options: 'i' } })
  console.log(`found ${unformattedEvents?.length} events with unformatted virtual location`)
  const promises = unformattedEvents?.map(async (event) => {
    const newLocation = formatLocation(event?.location)
    event.location = newLocation
    event.save()
  })
  await Promise.all(promises)

  console.log('*** DB verification complete')
}

export default verifyDatabase
