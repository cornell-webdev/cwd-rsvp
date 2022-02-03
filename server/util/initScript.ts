import { scrapeAtMidnight, scrapeCampusGroups } from './scrapeCampusGroups'
import verifyDatabase from './verifyDatabase'
import createTags from './createTags'

export default async () => {
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
