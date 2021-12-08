export const convert24To12hr = (time: string) => {
  return (((Number(time) + 11) % 12) + 1).toString()
}
