export interface IFormatDateOptions {
  isHideYear?: boolean
}

export const formatDate = (
  date: Date | null,
  options: IFormatDateOptions = {
    isHideYear: false,
  }
): string => {
  if (!date) return ''
  const targetDate = new Date(date)
  const fullDate = `${targetDate.getFullYear()}/${('0' + (targetDate.getMonth() + 1)).slice(-2)}/${(
    '0' + targetDate.getDate()
  ).slice(-2)}`

  if (options.isHideYear) {
    return fullDate.slice(5)
  }

  return fullDate
}

export function getTime(date: Date): string {
  return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`
}

export function getEventDate(dateString?: string | Date) {
  if (!dateString) return ''

  const d = new Date(dateString)
  const day = d.toLocaleString('default', { month: 'short', day: 'numeric' })
  return day
}

export function getEventTime(time: string) {
  const hour = parseInt(time.substring(0, 2))
  if (hour < 12) {
    return hour.toString() + ':' + time.substring(2, 4) + ' am'
  } else if (hour > 12) {
    return (hour - 12).toString() + ':' + time.substring(2, 4) + ' pm'
  } else {
    return hour.toString() + ':' + time.substring(2, 4) + ' pm'
  }
}

export function getEventDateTime(dateString: string | Date, startTime: string, endTime: string) {
  return `${getEventTime(startTime)} - ${getEventTime(endTime)}, ${getEventDate(dateString)}`
}
