import { scrapeAtMidnight, scrapeCampusGroups } from './scrapeCampusGroups'
import verifyDatabase from './verifyDatabase'

export default async () => {
  scrapeAtMidnight()
  await scrapeCampusGroups()
  await verifyDatabase()
}
