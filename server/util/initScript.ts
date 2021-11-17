// import Task from './models/Task'
// import User from './models/User'
import axios from 'axios'
import cheerio from 'cheerio'

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

export default async () => {
  // const CORNELL_UID_PROD = '60a9fa062bfdca0004875ece'
  const URL_OPEN_EVENTS =
    'https://cornell.campusgroups.com/mobile_ws/v17/mobile_events_list?range=0&limit=20&filter4_contains=OR&filter4_notcontains=OR&filter5=82904,82905,82910,82906,82912,82908&order=undefined&search_word=&&1636993315827'
  // const URL_OPEN_EVENTS =
  //   'https://cornell.campusgroups.com/events?event_type=82904%2C82905%2C82910%2C82906%2C82912%2C82908'
  const { data } = await axios.get(URL_OPEN_EVENTS)
  const events: any[] = []

  data.forEach((eventObj: any) => {
    const fields = eventObj.fields.split(',')
    // TODO: validate if required fields exist

    // TODO: define schemas. save to database

    const parsed: any = {}
    Object.values(eventObj).forEach((value, i) => {
      if (i >= 4) {
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
            parsed.isInvalidScrape = true
          }
        } else {
          parsed[fields[i - 3]] = value
        }
      }
    })

    if (!parsed.isInvalidScrape) {
      events.push(parsed)
    }
  })
  console.log('events', events)
}
