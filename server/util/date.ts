import moment from 'moment'

export const isDateTodayOrBefore = (date: Date) => {
  return moment(date).isSame(moment(new Date()), 'day') || isDateBeforeToday(date)
}

export const isDateBeforeToday = (date: Date) => {
  return new Date(date.toDateString()) < new Date(new Date().toDateString())
}

export const getTimeStamp = (date: Date) => {
  return `0${date.getHours()}`.slice(-2) + `0${date.getMinutes()}`.slice(-2)
}

export const getDateByDayDifference = (date: Date, difference: number) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() + difference)
}

export const getStartOfDay = (date: Date) => {
  const startDate = new Date(date)
  startDate.setHours(0, 0, 0, 0)
  return startDate
}

export const getEndOfDay = (date: Date) => {
  const tmr = getDateByDayDifference(date, 1)
  return new Date(tmr.getTime() - 1)
}

export const getFullDate = (date: Date | null): string => {
  if (!date) return ''
  return moment(date).format('YYYY/MM/DD')
}

export const areSameDates = (date1: Date, date2: Date): boolean => {
  return getFullDate(date1) === getFullDate(date2)
}
