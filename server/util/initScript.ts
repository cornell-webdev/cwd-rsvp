import Ticket from '../models/Ticket'
import createTags from './createTags'
import { scrapeAtMidnight, scrapeCampusGroups } from './scrapeCampusGroups'
import verifyDatabase from './verifyDatabase'

export default async () => {
  const tickets = await Ticket.find()
  tickets.forEach((ticket) => {
    console.log('ticket?.sellerId', ticket?.sellerId)
  })

  // const ticket = await new Ticket({
  //   userId: '620e853ab2bd2e5e97c6dcf8',
  //   eventId: '620e853ab2bd2e5e97c6dcf8',
  //   sellerId: '621e3f5b5d0e61e75d0e2724',
  //   name: 'Jay Joo',
  //   email: 'jj534@cornell.edu',
  //   pricePaid: '8.00',
  //   providerId: '60861897NV842605L',
  //   providerData: {
  //     id: '83R36875J0218362B',
  //     intent: 'CAPTURE',
  //     status: 'COMPLETED',
  //     purchase_units: null,
  //     payer: {
  //       name: null,
  //       email_address: 'jj534@cornell.edu',
  //       payer_id: 'TKHY8FFC39PEL',
  //       address: null,
  //     },
  //     create_time: '2022-03-01T15:53:36Z',
  //     update_time: '2022-03-01T15:53:43Z',
  //     links: null,
  //   },
  // }).save()

  // console.log('ticket', ticket)

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
