import Org from './../models/Org'
import Tag from './../models/Tag'
import Event from './../models/Event'
import axios from 'axios'
import cheerio from 'cheerio'
import { IOrg } from '../types/org.type'
import { IEvent } from '../types/event.type'

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

const fileUrl = (path: string): string => (path ? `https://static1.campusgroups.com${path}` : '')

const formatLocation = (location: string): string =>
  location === 'Private Location (sign in to display)' ||
  location === 'Private Location (register to display)'
    ? 'Private location'
    : location

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
        if (dateText[0].length === 17 && dateText[1]) {
          const date = new Date(dateText[0])
          const [start, end] = dateText[1].split('–')
          const startTime = convertTime12to24(start.trim())
          const endTime = convertTime12to24(end.trim())

          parsed.date = date
          parsed.startTime = startTime
          parsed.endTime = endTime
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

const scrapeAndParseEvents = async (count: number = 100) => {
  console.log('scraping', count, 'events')
  // fetch and parse events
  const URL_OPEN_EVENTS = `https://cornell.campusgroups.com/mobile_ws/v17/mobile_events_list?range=0&limit=${count}&filter4_contains=OR&filter4_notcontains=OR&filter5=82904,82905,82910,82906,82912,82908&order=undefined&search_word=&&1636993315827`

  const { data } = await axios.get(URL_OPEN_EVENTS)

  const eventPromises: any[] = data
    .map((eventObj: any) => parseEvent(eventObj))
    .filter((parsed: any) => parsed)

  const parsedEvents: any[] = (await Promise.all(eventPromises)).filter((parsed) => parsed)
  const mergedEvents: any[] = []

  // merge recurring events by adding to date
  const eventNameToIndex: { [eventName: string]: number } = {}

  parsedEvents.forEach((parsed) => {
    if (Object.hasOwnProperty.call(eventNameToIndex, parsed.eventName)) {
      const existingEvent = mergedEvents[eventNameToIndex[parsed.eventName]]
      existingEvent.dates = [
        ...existingEvent.dates,
        {
          date: parsed.date,
          startTime: parsed.startTime,
          endTime: parsed.endTime,
        },
      ]
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

  console.log('scraped', mergedEvents.length, 'events')

  return mergedEvents
}

const saveParsedEvents = async (parsedEvents: any[]) => {
  const savePromises = parsedEvents.map(async (parsed) => {
    // parsed.eventId is different for all recurring events
    // query existing event by eventName
    const existingEvent = await Event.findOne({ title: parsed.eventName })

    if (existingEvent) {
      console.log('found existing event:', existingEvent?.title)

      existingEvent.dates = [...existingEvent.dates, ...parsed.dates]

      if (parsed.tagId) {
        existingEvent.tagId = parsed.tagId
      }

      const updatedEvent = await existingEvent.save()

      console.log('added date:', updatedEvent.dates)

      return updatedEvent
    }

    // save org to DB if not saved yet
    let org = await Org.findOne({ providerId: parsed.clubId })

    if (!org) {
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
      const URL = `https://cornell.campusgroups.com/club_signup?group_type=&search=${parsed.clubName}&category_tags=&order=name_asc`
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
    }

    const newEvent = await new Event(eventData).save()
    console.log('New event saved:', newEvent.title)
    return newEvent
  })

  const savedEvents = await Promise.all(savePromises)
  console.log(savedEvents.length, 'events saved')
  return savedEvents
}

const scrapeTaggedEvents = async () => {
  console.log('scraping tagged events')
  const urls = {
    professional: `https://cornell.campusgroups.com/mobile_ws/v17/mobile_events_list?range=0&limit=150&filter4_contains=OR&filter4_notcontains=OR&filter5=82910,82906,82912,82908&filter6=5494462,4049455,3158958,6774419,6763630,6763631,6748514,6763629,6748183,6763632&order=undefined&search_word=&&1637426850949`,
    entertainment: `https://cornell.campusgroups.com/mobile_ws/v17/mobile_events_list?range=0&limit=150&filter4_contains=OR&filter4_notcontains=OR&filter5=82910,82906,82912,82908&filter6=3868170,3115655,3498442,2995299,5747008,5248111,6763668,3198950,6748012,7000900&order=undefined&search_word=&&1637426888392`,
    sports: `https://cornell.campusgroups.com/mobile_ws/v17/mobile_events_list?range=0&limit=150&filter4_contains=OR&filter4_notcontains=OR&filter5=82910,82906,82912,82908&filter6=2934926,3298159,3787380,5160587&order=undefined&search_word=&&1637426927868`,
  }

  const eventPromises = Object.entries(urls).map(async ([tagName, url]) => {
    const { data } = await axios.get(url)

    const eventPromises: any[] = data
      .map((eventObj: any) => parseEvent(eventObj))
      .filter((parsed: any) => parsed)

    const parsedEvents: any[] = await Promise.all(eventPromises)
    const tag = await Tag.findOne({ name: tagName })
    const validEvents: any[] = parsedEvents
      .filter((parsed) => parsed)
      .map((event) => ({ ...event, tagId: tag?._id?.toString() }))
    return validEvents
  })

  const eventsByTag = await Promise.all(eventPromises)
  const allEvents: any[] = []
  eventsByTag.forEach((events) => events.forEach((event) => allEvents.push(event)))
  console.log('scraped', allEvents.length, 'tagged events')
  return allEvents
}

export default async () => {
  /* scrape 150 recent events */
  // const parsedEvents = await scrapeAndParseEvents(150)
  // saveParsedEvents(parsedEvents)
  /* scrape tagged events */
  // const parsedTaggedEvents = await scrapeTaggedEvents()
  // saveParsedEvents(parsedTaggedEvents)
}
