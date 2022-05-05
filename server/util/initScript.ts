import Seller from '../models/Seller'
import Ticket from '../models/Ticket'
import createTags from './createTags'
import { scrapeAtMidnight, scrapeCampusGroups } from './scrapeCampusGroups'
import verifyDatabase from './verifyDatabase'

export default async () => {
  // Jessica seller ids
  // 62426d7663a77a00040575f8
  // 62467dab5139d70004e07c50
  // 62467db25139d70004e07d05

  // const seller = await Seller.findById('62426d7663a77a00040575f8')
  // console.log('seller?.length', seller)

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
