import moment from 'moment'

export const isDateTodayOrBefore = (date: Date) => {
  return moment(date).isSame(moment(new Date()), 'day') || isDateBeforeToday(date)
}

export const isDateBeforeToday = (date: Date): boolean => {
  return new Date(date.toDateString()) < new Date(new Date().toDateString())
}

export const getDateStamp = (date: Date | null): string => {
  if (!date) return ''
  return moment(date).format('MM/DD')
}

export const getFullDate = (date: Date | null): string => {
  if (!date) return ''
  return moment(date).format('YYYY-MM-DD')
}

export const areSameDates = (date1: Date, date2: Date): boolean => {
  return getFullDate(date1) === getFullDate(date2)
}

export const getDay = (date: Date) => {
  return moment(date).format('ddd')
}

export const addDays = (date: Date, days: number) => {
  const newDate = new Date(date)
  newDate.setDate(newDate.getDate() + days)
  return newDate
}

export const getDates = (startDate: Date, stopDate: Date) => {
  const dateArray = []
  let currentDate = startDate
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate))
    currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1))
  }
  return dateArray
}

export const getStartOfDay = (date: Date) => {
  const startDate = new Date(date)
  startDate.setHours(0, 0, 0, 0)
  return startDate
}
