import Event from './../models/Event'
import { scrapeAtMidnight, scrapeCampusGroups } from './scrapeCampusGroups'
import verifyDatabase from './verifyDatabase'

export default async () => {
  scrapeAtMidnight()

  // scrapeCampusGroups()
}
