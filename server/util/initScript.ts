import Ticket from '../models/Ticket'
import createTags from './createTags'
import { scrapeAtMidnight, scrapeCampusGroups } from './scrapeCampusGroups'
import verifyDatabase from './verifyDatabase'

export default async () => {
  // TODO: remove random ticket fetch for LOKO's showcase
  // const ticket = await Ticket.findOne({ eventId: '62426c0463a77a0004056bc5' })
  // console.log('ticket', ticket?._id)

  if (process.env.NODE_ENV !== 'development') {
    try {
      // TODO: enable scraping after loko showcase
      // scrapeAtMidnight()
      // await scrapeCampusGroups()
      // await verifyDatabase()
      // await createTags()
    } catch (error) {
      console.log('*** Error in production init script', error)
    }
  }
}
