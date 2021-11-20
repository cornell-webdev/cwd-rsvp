import Org from './../models/Org'
import Event from './../models/Event'
import axios from 'axios'
import cheerio from 'cheerio'
import { IOrg } from '../types/org.type'
import { IEvent } from '../types/event.type'

const convertTime12to24 = (time12h: string) => {
  const [time, modifier] = time12h.split(' ')

  let [hours, minutes] = time.split(':')

  if (hours === '12') {
    hours = '00'
  }

  if (modifier === 'PM') {
    hours = (parseInt(hours, 10) + 12).toString()
  }

  return Number(`${hours}${minutes || '00'}`)
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

const scrapeEvents = async (count: number = 100) => {
  // fetch and parse events
  const URL_OPEN_EVENTS = `https://cornell.campusgroups.com/mobile_ws/v17/mobile_events_list?range=0&limit=${count}&filter4_contains=OR&filter4_notcontains=OR&filter5=82904,82905,82910,82906,82912,82908&order=undefined&search_word=&&1636993315827`

  const { data } = await axios.get(URL_OPEN_EVENTS)

  const eventPromises: any[] = data
    .map((eventObj: any) => parseEvent(eventObj))
    .filter((parsed: any) => parsed)

  const parsedEvents: any[] = await Promise.all(eventPromises)

  return parsedEvents.filter((parsed) => parsed)
}

const saveParsedEvents = async (parsedEvents: any[]) => {
  const savePromises = parsedEvents.map(async (parsed) => {
    const existingEvent = await Event.findOne({ providerId: parsed.eventId })

    if (existingEvent) {
      console.log('found existing event:', existingEvent?.title)
      return existingEvent
    }

    // check if org is already saved in DB
    let org = await Org.findOne({ providerId: parsed.clubId })

    if (!org) {
      // add new org to DB
      const orgData: IOrg = {
        name: parsed.clubName,
        desc: '',
        linkedUserIds: [],
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

    // tagId not populated here
    const eventData: IEvent = {
      orgId: org._id,
      title: parsed.eventName,
      isVirtual: false, // TODO:
      location: formatLocation(parsed.eventLocation),
      meetingUrl: undefined,
      dates: [parsed.date],
      startTime: parsed.startTime,
      endTime: parsed.endTime,
      details: parsed.details,
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

  const scrapedEvents = await Promise.all(savePromises)
  console.log(scrapedEvents.length, 'events scraped')
  return scrapedEvents
}

const scrapeTaggedEvents = async () => {
  // TODO: search by tags. update tagId for seen events, create new event for unseen events
  return []
}

export default async () => {
  const parsedEvents = await scrapeEvents()
  saveParsedEvents(parsedEvents)

  const parsedTaggedEvents = await scrapeTaggedEvents()
  saveParsedEvents(parsedTaggedEvents)
}
