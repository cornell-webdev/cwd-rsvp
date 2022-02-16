import Org from '../models/Org'
import Log from '../models/Log'
import Tag from '../models/Tag'
import Event from '../models/Event'
import axios from 'axios'
import cheerio from 'cheerio'
import { IOrg } from '../types/org.type'
import { IEvent, IEventDate } from '../types/event.type'
import { CronJob } from 'cron'
import verifyDatabase from './verifyDatabase'

const convertTime12to24 = (time12h: string): string => {
  const [time, modifier] = time12h.split(' ')

  let [hours, minutes] = time.split(':')

  if (hours === '12') {
    hours = '00'
  }

  if (modifier === 'PM') {
    hours = (parseInt(hours, 10) + 12).toString()
  }

  return `${('0' + hours).slice(-2)}${minutes || '00'}`
}

export const fileUrl = (path?: string): string =>
  path ? `https://static1.campusgroups.com${path}` : ''

export const formatLocation = (location: string): string => {
  if (!location) {
    return ''
  } else if (location?.includes('<div')) {
    const text = location.split('<div')[0]
    const locationText = text.includes('Private Location') ? 'Online Event' : text
    const $ = cheerio.load(`<html>${location}</html>`)
    const link = $('a').attr('href')
    return `${locationText} ${link}`
  } else {
    return location === 'Private Location (sign in to display)' ||
      location === 'Private Location (register to display)'
      ? 'Private location'
      : location
  }
}

const parseEvent = async (eventObj: any) => {
  // parse given data
  const fields = eventObj.fields.split(',')
  const parsed: any = {}
  let isInvalid = false

  Object.values(eventObj).forEach((value, i) => {
    if (i >= 4 && fields[i - 3]) {
      if (fields[i - 3] === 'eventTags') {
        const $ = cheerio.load(`<html>${value}</html>`)
        const tags = $('html *')
          .contents()
          .toArray()
          .map((element) => (element.type === 'text' ? $(element).text().trim() : null))
          .filter((text) => text)
        parsed[fields[i - 3]] = tags
      } else if (fields[i - 3] === 'eventDates') {
        const $ = cheerio.load(`<html>${value}</html>`)
        const dateText: string[] = $('html *')
          .contents()
          .toArray()
          .map((element) => (element.type === 'text' ? $(element).text().trim() : null))
          .filter((text) => text) as string[]

        if (dateText?.length === 2 && dateText[0]?.length > 15 && dateText[1]) {
          // dateText exists
          const date = new Date(dateText[0])
          const [start, end] = dateText[1].split('–')
          if (start && end) {
            const startTime = convertTime12to24(start.trim())
            const endTime = convertTime12to24(end.trim())

            parsed.date = date
            parsed.startTime = startTime
            parsed.endTime = endTime
          } else {
            isInvalid = true
          }
        } else {
          isInvalid = true
        }
      } else {
        parsed[fields[i - 3]] = value
      }
    }
  })

  // validate required fields exist
  const requiredFields = [
    'eventId',
    'eventName',
    'date',
    'startTime',
    'endTime',
    'clubId',
    'clubName',
    'eventUrl',
  ]
  requiredFields.forEach((fieldName) => {
    if (!(fieldName in parsed)) {
      console.log('missing field:', fieldName)
      console.log('event invalidated')
      isInvalid = true
    }
  })

  if (isInvalid) return null

  // scrape event details
  const URL = `https://cornell.campusgroups.com${parsed.eventUrl}`
  const { data } = await axios.get(URL)
  const $ = cheerio.load(data)

  $('#event_details > div').each((i, el) => {
    const texts = $(el).contents().text().split('\n')

    let maxLength = 0
    let details = ''

    texts.forEach((text) => {
      if (text.length > maxLength) {
        maxLength = text.length
        details = text.trim()
      }
    })
    parsed.details = details
  })

  return parsed
}

const mergeParsedByDate = async (parsedEvents: any) => {
  const mergedEvents: any[] = []

  // merge recurring events by adding to date
  const eventNameToIndex: { [eventName: string]: number } = {}

  parsedEvents.forEach((parsed: any) => {
    if (Object.hasOwnProperty.call(eventNameToIndex, parsed.eventName)) {
      const existingEvent = mergedEvents[eventNameToIndex[parsed.eventName]]

      let isDuplicate = false
      existingEvent.dates?.forEach((existingDate: IEventDate) => {
        if (
          existingDate.date.toString() === parsed.date.toString() &&
          existingDate.startTime === parsed.startTime &&
          existingDate.endTime === parsed.endTime
        ) {
          isDuplicate = true
        }
      })

      if (!isDuplicate) {
        existingEvent.dates = [
          ...existingEvent.dates,
          {
            date: parsed.date,
            startTime: parsed.startTime,
            endTime: parsed.endTime,
          },
        ]
      }
    } else {
      eventNameToIndex[parsed.eventName] = mergedEvents.length
      const formattedParsed = {
        ...parsed,
        dates: [
          {
            date: parsed.date,
            startTime: parsed.startTime,
            endTime: parsed.endTime,
          },
        ],
      }
      delete formattedParsed.startTime
      delete formattedParsed.endTime
      delete formattedParsed.date
      mergedEvents.push(formattedParsed)
    }
  })
  return mergedEvents
}

const scrapeAndParseEvents = async (count: number = 100) => {
  // fetch and parse events
  const URL_ALL_EVENTS = `https://cornell.campusgroups.com/mobile_ws/v17/mobile_events_list?range=0&limit=${count}&filter4_contains=OR&filter4_notcontains=OR&order=undefined&search_word=&&1643931022946`
  // const URL_OPEN_EVENTS = `https://cornell.campusgroups.com/mobile_ws/v17/mobile_events_list?range=0&limit=${count}&filter4_contains=OR&filter4_notcontains=OR&filter5=82904,82905,82910,82906,82912,82908&order=undefined&search_word=&&1636993315827`

  const { data } = await axios.get(URL_ALL_EVENTS)

  const eventPromises: any[] = data
    .map((eventObj: any) => parseEvent(eventObj))
    .filter((parsed: any) => parsed)

  const parsedEvents: any[] = await Promise.all(eventPromises)
  const notNullEvents = parsedEvents.filter((parsed) => parsed)
  const mergedEvents = await mergeParsedByDate(notNullEvents)

  console.log('scraped', mergedEvents.length, 'events')

  return mergedEvents
}

const saveParsed = async (parsed: any) => {
  console.log('saving ', parsed.eventName)
  // TODO: what if the user changes event name on RSVP?
  const existingEvent = await Event.findOne({ title: parsed.eventName })

  if (existingEvent) {
    console.log('found existing event:', existingEvent?.title)

    // only add dates that don't exist yet
    const addedDates = parsed.dates?.filter((date: IEventDate) => {
      // console.log(`checking ${date} doesn't exist yet`)
      let isDuplicate = false

      existingEvent.dates?.forEach((existingDate) => {
        if (
          existingDate.date.toString() === date.date.toString() &&
          existingDate.startTime === date.startTime &&
          existingDate.endTime === date.endTime
        ) {
          // console.log(`found duplicate ${existingDate}`)
          isDuplicate = true
        }
      })

      return !isDuplicate
    })

    if (addedDates?.length > 0) {
      console.log(`adding ${addedDates?.length} dates`)
      existingEvent.dates = [...existingEvent.dates, ...addedDates]
    }

    if (!existingEvent.tagId && parsed.tagId) {
      console.log(`adding tag ${parsed.tagName}`)
      existingEvent.tagId = parsed.tagId
    }

    const updatedEvent = await existingEvent.save()

    return updatedEvent
  }

  // find existing org
  let org = await Org.findOne({ providerId: parsed.clubId })

  if (!org) {
    console.log(`club ${parsed.clubName} (${parsed.clubId}) not found`)
    // add new org to DB
    const orgData: IOrg = {
      name: parsed.clubName,
      desc: '',
      linkedUserIds: [],
      linkedUsers: [],
      provider: 'campusgroups',
      providerId: parsed.clubId,
      providerData: {
        clubId: parsed.clubId,
        clubLogin: parsed.clubLogin,
        clubName: parsed.clubName,
      },
    }

    // scrape org page
    const URL = encodeURI(
      `https://cornell.campusgroups.com/club_signup?group_type=&search=${parsed.clubName}&category_tags=&order=name_asc`
    )
    const { data } = await axios.get(URL)
    const $ = cheerio.load(data)

    $(`#club_${parsed.clubId}`).each((i, el) => {
      const texts = $(el).contents().text().split('\n')
      const desc = texts[2].trim()
      orgData.desc = desc
    })

    const src = $('.media-object--bordered').first().attr('src')
    if (src) orgData.avatar = fileUrl(src)

    org = await new Org(orgData).save()
    console.log('added new org: ', parsed.clubName)
  }

  const eventData: IEvent = {
    orgId: org._id,
    title: parsed.eventName,
    location: formatLocation(parsed.eventLocation),
    dates: parsed.dates,
    details: parsed.details,
    tagId: parsed.tagId,
    imgs: [fileUrl(parsed.eventPicture)],
    views: parsed.eventAttendees,
    likedUserIds: [],
    provider: 'campusgroups',
    providerId: parsed.eventId,
    providerUrl: `https://cornell.campusgroups.com${parsed.eventUrl}`,
    providerData: parsed,
    isTicketed: false,
  }

  const newEvent = await new Event(eventData).save()
  console.log('New event saved:', newEvent.title)
  return newEvent
}

const saveParsedEvents = async (parsedEvents: any[]) => {
  for (const parsed of parsedEvents) {
    await saveParsed(parsed)
  }

  console.log('parsed events saved')
}

const scrapeAndTagEvents = async () => {
  const urls = {
    professional: `https://cornell.campusgroups.com/mobile_ws/v17/mobile_events_list?range=0&limit=150&filter4_contains=OR&filter4_notcontains=OR&filter5=82910,82906,82912,82908&filter6=5494462,4049455,3158958,6774419,6763630,6763631,6748514,6763629,6748183,6763632&order=undefined&search_word=&&1637426850949`,
    entertainment: `https://cornell.campusgroups.com/mobile_ws/v17/mobile_events_list?range=0&limit=150&filter4_contains=OR&filter4_notcontains=OR&filter5=82910,82906,82912,82908&filter6=3868170,3115655,3498442,2995299,5747008,5248111,6763668,3198950,6748012,7000900&order=undefined&search_word=&&1637426888392`,
    sports: `https://cornell.campusgroups.com/mobile_ws/v17/mobile_events_list?range=0&limit=150&filter4_contains=OR&filter4_notcontains=OR&filter5=82910,82906,82912,82908&filter6=2934926,3298159,3787380,5160587&order=undefined&search_word=&&1637426927868`,
  }

  const tagPromises = Object.entries(urls).map(async ([tagName, url]) => {
    const { data } = await axios.get(url)

    const parsePromises: any[] = data
      .map((eventObj: any) => parseEvent(eventObj))
      .filter((parsed: any) => parsed)

    const parsedEvents: any[] = (await Promise.all(parsePromises)).filter((parsed) => parsed)
    const mergedEvents = await mergeParsedByDate(parsedEvents)
    const tag = await Tag.findOne({ name: tagName })
    const taggedEvents: any[] = mergedEvents.map((event) => ({
      ...event,
      tagId: tag?._id?.toString(),
      tagName,
    }))
    return taggedEvents
  })

  const eventsByTag = await Promise.all(tagPromises)
  const allEvents: any[] = []
  eventsByTag.forEach((events) => events.forEach((event) => allEvents.push(event)))
  console.log('scraped', allEvents.length, 'tagged events')
  return allEvents
}

export const scrapeOrgs = async () => {
  // WARNING: do not call in production
  // will cause a memory leak + application crash
  console.log('*** scraping all orgs')

  const URL = 'https://cornell.campusgroups.com/club_signup?view=all'
  // const URL = 'https://cornell.campusgroups.com/club_signup'
  const { data } = await axios.get(URL)
  const $ = cheerio.load(data)

  const orgs: IOrg[] = []

  $('.desc-block').each((i, el) => {
    // console.log('$(el).html()', $(el).html())

    // id
    const rawId = $(el).find('p[aria-label="Mission Statement"]').attr('id')
    const providerId = rawId?.substring(5, rawId?.length - 6)

    // name
    const rawName = $(el).find('p.media-heading a').first().attr('aria-label')
    const name = rawName?.substring(0, rawName.length - 40)?.trim()

    // website
    const website = $(el).find('p.media-heading a').first().attr('href')

    // desc
    const rawDesc = $(el).find('p[aria-label="Mission Statement"]').text().split('\n')
    const desc = rawDesc[2]?.trim()

    const src = $('.media-object--bordered').first().attr('src')
    const avatar = fileUrl(src)

    if (providerId && name && website && desc && avatar) {
      const orgData: IOrg = {
        name,
        website,
        desc,
        avatar,
        linkedUserIds: [],
        linkedUsers: [],
        providerId,
        provider: 'campusgroups',
        providerData: {
          name,
          website,
          desc,
          avatar,
          providerId,
        },
      }
      orgs.push(orgData)
    }
  })

  const promises = orgs.map(async (org) => {
    const existingOrg = await Org.findOne({
      $or: [{ providerId: org?.providerId }, { name: org?.name }],
    })

    if (existingOrg) {
      console.log('found existing org:', existingOrg.name)
      if (!existingOrg?.website) {
        existingOrg.website = org?.website
        const updatedOrg = await existingOrg.save()
        console.log('added website url:', org?.website)
        return updatedOrg
      } else {
        return false
      }
    }

    console.log('saving new org:', org?.name)
    const res = await new Org(org).save()
    return res
  })

  const savedOrgs = (await Promise.all(promises)).filter((org) => org)
  console.log(`scraped and saved ${savedOrgs?.length} new orgs`)
}

export const scrapeCampusGroups = async () => {
  /* scrape recent events */
  console.log('*** STAGE 1.1: scraping events ***')
  const parsedEvents = await scrapeAndParseEvents(150)
  console.log('*** STAGE 1.2: saving scraped events ***')
  await saveParsedEvents(parsedEvents)

  /* scrape tagged events */
  console.log('*** STAGE 2.1: scraping tagged events ***')
  const parsedTaggedEvents = await scrapeAndTagEvents()
  console.log('*** STAGE 2.2: saving tags to existing events ***')
  await saveParsedEvents(parsedTaggedEvents)

  console.log('*** Scrape complete')
  await verifyDatabase()
}

const scrapeJob = new CronJob('0 0 0 * * *', async () => {
  console.log('running cron job: scrapeJob')
  new Log({ action: 'scrape campus groups' }).save()
  scrapeCampusGroups()
})

export const scrapeAtMidnight = () => {
  console.log('found cron job: scrapeAtMidnight')
  scrapeJob.start()
}
