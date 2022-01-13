import Org from '../models/Org'
import Event from '../models/Event'

const verifyDatabase = async () => {
  console.log('*** checking event duplicates')
  const events = await Event.find()
  const dupEvents = []
  for (const event of events) {
    const duplicates = await Event.find({ title: event.title })
    if (duplicates?.length > 1) {
      dupEvents.push(event.title)
    }
  }
  console.log('duplicate event names:', dupEvents)

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
