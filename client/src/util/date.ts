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

export function getEventDate(date: Date) {
  const d = new Date(date.toString().split('T')[0])
  const day = d.toLocaleString('default', { month: 'short', day: 'numeric' })
  return day
}
