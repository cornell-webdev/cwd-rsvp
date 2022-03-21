import createTags from './createTags'
import sendTicketEmail from './email/sendTicketEmail'
import { scrapeAtMidnight, scrapeCampusGroups } from './scrapeCampusGroups'
import verifyDatabase from './verifyDatabase'

export default async () => {
  sendTicketEmail({
    email: 'jj534@cornell.edu',
    eventName: 'test event name',
  })

  if (process.env.NODE_ENV !== 'development') {
    try {
      scrapeAtMidnight()
      await scrapeCampusGroups()
      await verifyDatabase()
      await createTags()
    } catch (error) {
      console.log('*** Error in production init script', error)
    }
  }
}
