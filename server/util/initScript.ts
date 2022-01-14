import { scrapeAtMidnight, scrapeCampusGroups } from './scrapeCampusGroups'
import verifyDatabase from './verifyDatabase'
import createTags from './createTags'

export default async () => {
  if (process.env.NODE_ENV !== 'development') {
    scrapeAtMidnight()
    await scrapeCampusGroups()
    await verifyDatabase()
    await createTags()
  }
}
