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
  const fullDate = `${date.getFullYear()}/${('0' + (date.getMonth() + 1)).slice(-2)}/${(
    '0' + date.getDate()
  ).slice(-2)}`

  if (options.isHideYear) {
    return fullDate.slice(5)
  }

  return fullDate
}
